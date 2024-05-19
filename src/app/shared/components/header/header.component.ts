import { Location } from '@angular/common';
import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() isBackRoute?: boolean = false;

  constructor(private _location: Location) {}

  protected backRoute(): void {
    this._location.back();
  }
}
