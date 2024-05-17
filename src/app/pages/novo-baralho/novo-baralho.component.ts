import { Component, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PokemonService } from '../../core/services/pokemon.service';
import { Pokemon } from '../../core/interfaces/Pokemon';
import { CommonModule } from '@angular/common';
import { Util } from '../../shared/utils';
import { FormsModule } from '@angular/forms';
import { MyPackTableComponent } from '../../shared/components/my-pack-table/my-pack-table.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-novo-baralho',
  standalone: true,
  imports: [SharedModule, CommonModule, FormsModule, MyPackTableComponent],
  templateUrl: './novo-baralho.component.html',
  styleUrl: './novo-baralho.component.scss',
})
export class NovoBaralhoComponent implements OnInit {
  private _currentPage: number = 1;

  protected pokemonsList: Pokemon[] = [];
  protected myPokemonList = signal<Pokemon[]>([]);
  protected packName = signal<string>('');

  constructor(
    private _pokemonService: PokemonService,
    private _router: Router
  ) {}

  ngOnInit(): void {
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

  // service para salvar dados no localStorage

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
    if (this._validateQtdMin()) {
      this._storeInLocalStorage();
    }
  }

  private _storeInLocalStorage(): void {
    const key = this.packName();
    const uIndex = Date.now();

    if (key) {
      const existingCards = localStorage.getItem('cards');
      let cardsArray: any[] = existingCards ? JSON.parse(existingCards) : [];
      cardsArray.push({ name: key, index: uIndex, items: this.myPokemonList() });
      
      localStorage.setItem('cards', JSON.stringify(cardsArray));

      Util.showAlert(`Baralho armazenado com o nome de <br> <strong>${this.packName()}</strong>`);
      this._router.navigate(['/']);
    } else {
      Util.showAlert(`Insira um nome para o baralho.`);
    }
  }

  protected loadMore(): void {
    this._currentPage++;
    this.loadPokemons();
  }
}
