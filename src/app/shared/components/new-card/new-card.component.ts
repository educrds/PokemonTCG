import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrl: './new-card.component.scss',
})
export class NewCardComponent {
  constructor(private _router: Router) {}

  protected onCardClicked(): void {
    this._router.navigate(['/meu-baralho']);
  }
}
