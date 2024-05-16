import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { NewCardComponent } from './components/new-card/new-card.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    ButtonComponent,
    CardComponent,
    NewCardComponent,
    PokemonCardComponent,
    LoadingSpinnerComponent,
    TruncatePipe,
  ],
  exports: [
    NavbarComponent,
    HeaderComponent,
    ButtonComponent,
    CardComponent,
    NewCardComponent,
    PokemonCardComponent,
    LoadingSpinnerComponent,
  ],
  imports: [CommonModule],
})
export class SharedModule {}
