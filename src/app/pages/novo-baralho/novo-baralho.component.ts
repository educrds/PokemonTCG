import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PokemonService } from '../../core/services/pokemon.service';
import { Pokemon } from '../../core/interfaces/Pokemon';

@Component({
  selector: 'app-novo-baralho',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './novo-baralho.component.html',
  styleUrl: './novo-baralho.component.scss',
})
export class NovoBaralhoComponent implements OnInit {
  private _currentPage: number = 1;
  protected pokemonsList: Pokemon[] = [];

  constructor(private _pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  private loadPokemons(): void {
    this._pokemonService
      .getPokemons({ pageSize: 12, page: this._currentPage })
      .subscribe({
        next: (res) => (this.pokemonsList = this.pokemonsList.concat(res.data)),
        error: (err) => console.error('Erro ao carregar os pokémons', err),
      });
  }

  protected addPokemonToPack(pokemon: Pokemon) {
    console.log(pokemon);
  }

  protected loadMore(): void {
    this._currentPage++;
    this.loadPokemons();
  }
}
