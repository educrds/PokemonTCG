import { Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonType = 'primary' | 'outline' | 'success';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() buttonType: ButtonType = 'primary';
  @Output() cardClicked = new EventEmitter<void>();

  protected onClick(): void {
    this.cardClicked.emit();
  }
}
