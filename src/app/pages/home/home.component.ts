import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Pack } from '../../core/interfaces/Pack';
import { Util } from '../../shared/utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  protected myPacks: Pack[] = [];

  ngOnInit(): void {
    this.myPacks = Util.getCardsFromLocalStorage();
  }

  // Remove o item correspondente do localStorage
  deletePack(index: number): void {
    this.myPacks = this.myPacks.filter(card => card.index !== index);
    localStorage.setItem('cards', JSON.stringify(this.myPacks));
  }
}