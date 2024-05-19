import { Component, OnDestroy, OnInit, WritableSignal, signal } from '@angular/core';
import { PokemonService } from '../../core/services/pokemon.service';
import { Pokemon } from '../../core/interfaces/Pokemon';
import { Util } from '../../shared/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-novo-baralho',
  templateUrl: './novo-baralho.component.html',
  standalone: true,
  imports:[SharedModule, FormsModule],
  styleUrl: './novo-baralho.component.scss',
})

export class NovoBaralhoComponent implements OnInit, OnDestroy {
  private _subscription!: Subscription;
  private _currentPage: WritableSignal<number> = signal<number>(1);
  
  protected id: number | null = null;
  protected myPokemonList: WritableSignal<Pokemon[]> = signal<Pokemon[]>([]);
  protected packName: WritableSignal<string> = signal<string>('');
  protected pokemonsList: Pokemon[] = [];

  constructor(
    private _pokemonService: PokemonService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this._route.snapshot.queryParams['id'];

    if (this.id) {
      const allPacks = Util.getCardsFromLocalStorage();
      const cardById = allPacks.find((card) => card.index === this.id);

      if (cardById) {
        const { name, items } = cardById;

        this.packName.set(name);
        this.myPokemonList.set(items);
      }
    }
    this.loadPokemons();
  }

  ngOnDestroy(): void {
    if(this._subscription) this._subscription.unsubscribe();
  }

  /**
   * Carrega a lista de Pokémons da API com base na página atual e adiciona os novos dados à lista existente.
  */
  private loadPokemons(): void {
    this._subscription = this._pokemonService
      .getPokemons({ pageSize: 12, page: this._currentPage() })
      .subscribe({
        next: (res) => (this.pokemonsList = this.pokemonsList.concat(res.data)),
        error: (err) => Util.showAlert(err.message),
      });
  }

  /**
     * Adiciona um Pokémon ao baralho se as validações de quantidade máxima e mínima forem atendidas.
     * @param pokemon - O Pokémon a ser adicionado ao baralho.
  */
  protected addPokemonToPack(pokemon: Pokemon) {
    if (this._validateQtdPokemons(pokemon) && this._validateQtdMax()) {
      this.myPokemonList.update((values) => [...values, pokemon]);
      Util.showAlert(`Pokémon <strong>${pokemon.name}</strong> adicionado com sucesso!`);
    }
  }

  /**
     * Valida se o baralho já atingiu a quantidade máxima de 60 cartas.
     * @returns `true` se a quantidade máxima não foi atingida, caso contrário `false`.
  */
  private _validateQtdMax(): boolean {
    if (this.myPokemonList().length === 60) {
      Util.showAlert(`Limite máximo de <strong>60 cartas</strong> atingido.`);
      return false;
    }
    return true;
  }

  /**
     * Valida se o baralho possui a quantidade mínima de 24 cartas.
     * @returns `true` se a quantidade mínima for atingida, caso contrário `false`.
  */
  private _validateQtdMin(): boolean {
    if (this.myPokemonList().length < 24) {
      Util.showAlert(`O baralho tem que possuir, no mínimo, <strong>24 cartas</strong>.`);
      return false;
    }
    return true;
  }

  /**
     * Valida se o baralho já possui 4 cartas do mesmo Pokémon.
     * @param pokemon - O Pokémon a ser validado.
     * @returns `true` se a quantidade de cartas do Pokémon for menor que 4, caso contrário `false`.
  */
  private _validateQtdPokemons(pokemon: Pokemon): boolean {
    const errorMessage = `O baralho já possui <strong>4 cartas</strong> de mesmo nome: <strong>${pokemon.name}</strong>.`;
    const qtdOccurrences = this.myPokemonList().filter((item) => item.name === pokemon.name).length;

    if (qtdOccurrences === 4) {
      Util.showAlert(errorMessage);
      return false;
    }
    return true;
  }

  /**
     * Salva o baralho atual após validar se possui um nome e a quantidade mínima de cartas.
     * Atualiza ou armazena o baralho no local storage dependendo se é uma edição ou uma criação.
  */
  protected savePack() {
    if (!this.packName()) {
      return Util.showAlert(`Insira um nome para o baralho.`);
    }

    if (this._validateQtdMin()) {
      this.id ? this.updatePackInLocalStorage() : this.storePackInLocalStorage();
    }
  }

  /**
     * Atualiza o baralho existente no local storage.
     * Substitui os itens e o nome do baralho existente com os novos valores.
     * Salva o baralho atualizado no local storage e retorna aos baralhos.
  */
  private updatePackInLocalStorage(): void {
    const cardsArray = Util.getCardsFromLocalStorage();
    const existingPackIndex = cardsArray.findIndex((pack) => pack.index === this.id);

    if (existingPackIndex !== -1) {
      cardsArray[existingPackIndex].items = this.myPokemonList();
      cardsArray[existingPackIndex].name = this.packName();
      localStorage.setItem('cards', JSON.stringify(cardsArray));
      Util.showAlert(`Baralho atualizado com sucesso!`);
      this.navigateToHome();
    }
  }

  /**
     * Armazena um novo baralho no local storage.
     * Gera um índice único baseado na data atual e salva o baralho.
  */
  private storePackInLocalStorage(): void {
    const uniqueIndex = Date.now();
    const cardsArray = Util.getCardsFromLocalStorage();

    cardsArray.push({ name: this.packName(), index: uniqueIndex, items: this.myPokemonList() });
    localStorage.setItem('cards', JSON.stringify(cardsArray));
    Util.showAlert(`Baralho inserido com sucesso!`);
    this.navigateToHome();
  }

  private navigateToHome(): void {
    this._router.navigate(['/']);
  }

  /**
      * Carrega mais Pokémons incrementando a página atual e chamando o método de carregamento.
  */
  protected loadMore(): void {
    this._currentPage.update((page) => ++page);
    this.loadPokemons();
  }
}
