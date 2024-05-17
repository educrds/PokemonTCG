import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() buttonType: 'primary' | 'outline' = 'primary';
  @Output() cardClicked = new EventEmitter<void>();

  protected onClick(): void {
    this.cardClicked.emit();
  }
}
