import { Component, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PokemonService } from '../../core/services/pokemon.service';
import { Pokemon } from '../../core/interfaces/Pokemon';
import { CommonModule } from '@angular/common';
import { Util } from '../../shared/utils';
import { FormsModule } from '@angular/forms';
import { MyPackTableComponent } from '../../shared/components/my-pack-table/my-pack-table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Pack } from '../../core/interfaces/Pack';
@Component({
  selector: 'app-novo-baralho',
  standalone: true,
  imports: [SharedModule, CommonModule, FormsModule, MyPackTableComponent],
  templateUrl: './novo-baralho.component.html',
  styleUrl: './novo-baralho.component.scss',
})
export class NovoBaralhoComponent implements OnInit {
  private _currentPage: number = 1;
  private _id: number | null = null;

  protected pokemonsList: Pokemon[] = [];
  protected myPokemonList = signal<Pokemon[]>([]);
  protected packName = signal<string>('');

  constructor(private _pokemonService: PokemonService, private _router: Router, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._id = +this._route.snapshot.queryParams['id'];

    if (this._id) {
      const allPacks = this.getCardsFromLocalStorage();
      const cardById = allPacks.find((card) => card.index === this._id);
      
      if (cardById) {
        const { name, items } = cardById;

        this.packName.set(name);
        this.myPokemonList.update(() => {
          return [...items];
        });
      }
    }
    this.loadPokemons();
  }

  private loadPokemons(): void {
    this._pokemonService
      .getPokemons({ pageSize: 12, page: this._currentPage })
      .subscribe({
        next: (res) => (this.pokemonsList = this.pokemonsList.concat(res.data)),
        error: () => Util.showAlert(`Erro ao carregar os pokémons`),
      });
  }

  protected addPokemonToPack(pokemon: Pokemon) {
    if (this._validateQtdPokemons(pokemon) && this._validateQtdMax()) {
      this.myPokemonList.update((values) => {
        return [...values, pokemon];
      });
      Util.showAlert(`Pokémon <strong>${pokemon.name}</strong> adicionado com sucesso!`);
    }
  }

  private _validateQtdMax(): boolean {
    const arrayLength = this.myPokemonList().length;

    if (arrayLength === 60) {
      Util.showAlert(`Limite máximo de <strong>60 cartas</strong> atingido.`);
      return false;
    }
    return true;
  }

  private _validateQtdMin(): boolean {
    const arrayLength = this.myPokemonList().length;

    if (arrayLength < 24) {
      Util.showAlert(`O baralho tem que possuir, no mínimo, <strong>24 cartas</strong>.`);
      return false;
    }
    return true;
  }

  private _validateQtdPokemons(pokemon: Pokemon): boolean {
    const errorMessage = `O baralho já possui <strong>4 cartas</strong> de mesmo nome: <strong>${pokemon.name}</strong>.`;
    const qtdOccurrences = this.myPokemonList().filter((item) => item.name === pokemon.name).length;

    if (qtdOccurrences === 4) {
      Util.showAlert(errorMessage);
      return false;
    }
    return true;
  }

  protected savePack() {
    const packName = this.packName();

    if (!packName) {
      return Util.showAlert(`Insira um nome para o baralho.`);
    }

    if (this._validateQtdMin()) {
      this._id ? this.updatePackInLocalStorage() : this.storePackInLocalStorage();
    }
  }

  private getCardsFromLocalStorage(): Pack[] {
    const existingCards = localStorage.getItem('cards');
    let cardsArray: Pack[] = existingCards ? JSON.parse(existingCards) : [];
    return cardsArray;
  }

  private updatePackInLocalStorage(): void {
    const packName = this.packName();
    const cardsArray = this.getCardsFromLocalStorage();
    const existingPackIndex = cardsArray.findIndex((pack) => pack.index === this._id);

    if (existingPackIndex !== -1) {
      cardsArray[existingPackIndex].items = this.myPokemonList();
      cardsArray[existingPackIndex].name = packName;
      localStorage.setItem('cards', JSON.stringify(cardsArray));
      Util.showAlert(`Baralho atualizado com sucesso!`);
      this.navigateToHome();
    }
  }

  private storePackInLocalStorage(): void {
    const packName = this.packName();
    const uniqueIndex = Date.now();
    const cardsArray = this.getCardsFromLocalStorage();

    cardsArray.push({ name: packName, index: uniqueIndex, items: this.myPokemonList() });
    localStorage.setItem('cards', JSON.stringify(cardsArray));
    Util.showAlert(`Baralho inserido com sucesso!`);
    this.navigateToHome();
  }

  private navigateToHome(): void {
    this._router.navigate(['/']);
  }

  protected loadMore(): void {
    this._currentPage++;
    this.loadPokemons();
  }
}
