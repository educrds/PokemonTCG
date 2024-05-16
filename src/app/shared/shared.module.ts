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
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { PokemonCardHeaderComponent } from './components/pokemon-card/pokemon-card-header/pokemon-card-header.component';
import { PokemonCardBodyComponent } from './components/pokemon-card/pokemon-card-body/pokemon-card-body.component';
import { PokemonCardFooterComponent } from './components/pokemon-card/pokemon-card-footer/pokemon-card-footer.component';

@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    ButtonComponent,
    CardComponent,
    NewCardComponent,
    PokemonCardComponent,
    PokemonCardHeaderComponent,
    PokemonCardBodyComponent,
    PokemonCardFooterComponent,
    LoadingSpinnerComponent,
    TruncatePipe,
    InfiniteScrollDirective
  ],
  exports: [
    NavbarComponent,
    HeaderComponent,
    ButtonComponent,
    CardComponent,
    NewCardComponent,
    PokemonCardComponent,
    PokemonCardHeaderComponent,
    PokemonCardBodyComponent,
    PokemonCardFooterComponent,
    LoadingSpinnerComponent,
    InfiniteScrollDirective
  ],
  imports: [CommonModule],
})
export class SharedModule {}
