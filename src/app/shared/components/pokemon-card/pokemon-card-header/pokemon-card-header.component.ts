import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../../core/interfaces/Pokemon';

@Component({
  selector: 'app-pokemon-card-header',
  templateUrl: './pokemon-card-header.component.html',
  styleUrl: './pokemon-card-header.component.scss'
})
export class PokemonCardHeaderComponent {
  @Input() pokemon!: Pokemon;
}
