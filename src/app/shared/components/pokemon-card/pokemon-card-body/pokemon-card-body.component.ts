import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../../core/interfaces/Pokemon';

@Component({
  selector: 'app-pokemon-card-body',
  templateUrl: './pokemon-card-body.component.html',
  styleUrl: './pokemon-card-body.component.scss'
})
export class PokemonCardBodyComponent {
  @Input() pokemon!:Pokemon;
}
