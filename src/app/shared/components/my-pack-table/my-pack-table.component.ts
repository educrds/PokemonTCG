import { Component, Input } from '@angular/core';
import { RowType } from 'igniteui-angular';
import { Pokemon } from '../../../core/interfaces/Pokemon';

@Component({
  selector: 'app-my-pack-table',
  templateUrl: './my-pack-table.component.html',
  styleUrl: './my-pack-table.component.scss',
})
export class MyPackTableComponent {
  @Input() data: Pokemon[] = [];

  protected isDeleted(rowContext: RowType) {
    return rowContext && rowContext.deleted;
  }
}
