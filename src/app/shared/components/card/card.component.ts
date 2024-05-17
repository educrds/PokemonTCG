import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pack } from '../../../core/interfaces/Pack';
import { Router } from '@angular/router';
import { Pokemon } from '../../../core/interfaces/Pokemon';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() item!: Pack;
  @Output() deleteClicked = new EventEmitter<number>();

  protected uniqueTypes: string[] = [];
  protected totalTrainers: number = 0;
  protected totalPokemons: number = 0;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.uniqueTypes = this._getUniqueTypes(this.item);
    this.totalTrainers = this._getTotalBySupertype('Trainer');
    this.totalPokemons = this._getTotalBySupertype('Pokémon');
  }

  protected editPack(index: number) {
    this._router.navigate(['/novo-baralho'], {
      queryParams: { id: index },
    });
  }

  protected deletePack(index: number) {
    this.deleteClicked.emit(index);
  }

  // Metódo para obter total de cartas no baralho por supertype
  private _getTotalBySupertype(supertype: string): number {
    return this.item.items.filter((card) => card.supertype === supertype).length
  }

  // Metódo para obter tipos únicos
  private _getUniqueTypes(pack: Pack) {
    let types: string[] = [];

    pack.items.forEach((item: Pokemon) => {
      types = types.concat(item.types);
    });

    const uniqueTypes = Array.from(new Set(types));

    return uniqueTypes;
  }
}
