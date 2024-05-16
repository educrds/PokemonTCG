import { Component, HostListener, OnInit } from '@angular/core';
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
  protected pokemonsList: Pokemon[] = [];
  private _currentPage: number = 1;

  constructor(private _pokemonService: PokemonService) {}
  
  ngOnInit(): void {
    this.loadPokemons();
  }
  
  private loadPokemons(): void {
    this._pokemonService
    .getPokemons({ pageSize: 12, page: this._currentPage })
      .subscribe({
        next: (res) => {
          this.pokemonsList = this.pokemonsList.concat(res.data);
        },
        error: (err) => console.error('Erro ao carregar os pokémons', err),
      });
    }

    // Criar diretiva
    @HostListener('window:scroll', ['$event'])
    onWindowScroll(): void {
      const scrollPosition = this.getScrollPosition();
      const windowHeight = document.documentElement.offsetHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrolledToBottom = this.isScrolledToBottom(scrollPosition, windowHeight, documentHeight);
    
      if (scrolledToBottom) {
        this.loadMore();
      }
    }
    
    private getScrollPosition(): number {
      return document.documentElement.scrollTop || document.body.scrollTop;
    }
    
    private isScrolledToBottom(scrollPosition: number, windowHeight: number, documentHeight: number): boolean {
      const distanceFromBottom = Math.round(scrollPosition + windowHeight);
      return distanceFromBottom >= documentHeight;
    }
    
  protected loadMore(): void {
    this._currentPage++;
    this.loadPokemons();
  }
}
