import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../../core/interfaces/Pokemon';

@Component({
  selector: 'app-pokemon-card-footer',
  templateUrl: './pokemon-card-footer.component.html',
  styleUrl: './pokemon-card-footer.component.scss'
})
export class PokemonCardFooterComponent {
  @Input() pokemon!:Pokemon;
}
