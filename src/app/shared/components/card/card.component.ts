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
  @Input() pack!: Pack;
  @Output() deleteClicked = new EventEmitter<number>();

  protected uniqueTypes: string[] = [];
  protected totalTrainers: number = 0;
  protected totalPokemons: number = 0;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.uniqueTypes = this._getUniqueTypes(this.pack);
    this.totalTrainers = this._getTotalBySupertype('Trainer');
    this.totalPokemons = this._getTotalBySupertype('Pokémon');
  }

  /**
     * Navega para a rota de meu baralho para editar o baralho com um dado índice.
     * @param index - O índice do baralho a ser editado.
  */
  protected editPack(index: number): void {
    this._router.navigate(['/meu-baralho'], { queryParams: { id: index } });
  }

  /**
     * Emite um evento para deletar o baralho com um dado índice.
     * @param index - O índice do baralho a ser removido.
  */
  protected deletePack(index: number): void {
    this.deleteClicked.emit(index);
  }

  /**
     * Obtém o número total de cartas no baralho que combinam o supertype indicado.
     * @param supertype - O supertype da carta para ser somado.
     * @returns O número total de cartas de um dado supertype no baralho.
  */  private _getTotalBySupertype(supertype: string): number {
    return this.pack.items.filter((card) => card.supertype === supertype).length;
  }

  /**
     * Obtém tipos únicos de cartas no baralho.
     * @param pack - O baralho para ser extraído os tipos únicos.
     * @returns Um array de tipos únicos no baralho.
  */  private _getUniqueTypes(pack: Pack): string[] {
    const allTypes = pack.items.flatMap((item: Pokemon) => item.types);
    return Array.from(new Set(allTypes));
  }
}
