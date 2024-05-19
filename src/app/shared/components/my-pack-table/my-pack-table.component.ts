import { Component, Input } from '@angular/core';
import { IgxGridModule, IgxActionStripModule, IgxIconModule, IgxDialogModule, IgxButtonModule, IgxFocusModule, RowType } from 'igniteui-angular';
import { Pokemon } from '../../../core/interfaces/Pokemon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-pack-table',
  standalone: true,
  imports: [IgxGridModule, IgxActionStripModule, IgxIconModule, IgxDialogModule, IgxButtonModule, IgxFocusModule, CommonModule],
  templateUrl: './my-pack-table.component.html',
  styleUrl: './my-pack-table.component.scss',
})
export class MyPackTableComponent {
  @Input() data: Pokemon[] = [];

  protected isDeleted(rowContext: RowType) {
    return rowContext && rowContext.deleted;
  }
}
