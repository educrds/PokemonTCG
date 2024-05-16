import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../../core/interfaces/Pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
  @Output() cardClicked = new EventEmitter<Pokemon>();

  protected onClick(): void {
    this.cardClicked.emit(this.pokemon);
  }
}
