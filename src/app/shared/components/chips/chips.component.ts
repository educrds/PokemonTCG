import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss'
})
export class ChipsComponent {
  @Input() label!: string | number;
  @Input() chipType!: 'blue' | 'yellow' | 'red' | 'purple' | 'orange';
}
