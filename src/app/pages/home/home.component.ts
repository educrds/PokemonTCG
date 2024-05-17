import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Pack } from '../../core/interfaces/Pack';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  protected myCards: Pack[] = [];

  ngOnInit(): void {
    this.getFromLocalStorage();
  }

  private getFromLocalStorage(): void {
    const cards = localStorage.getItem("cards");
    if(cards){
      this.myCards = JSON.parse(cards);
    }
  }
}