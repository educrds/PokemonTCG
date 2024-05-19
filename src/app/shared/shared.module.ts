import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgxGridModule, IgxActionStripModule, IgxIconModule, IgxDialogModule, IgxButtonModule, IgxFocusModule } from 'igniteui-angular';
import { FormsModule } from '@angular/forms';

// components
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { NewCardComponent } from './components/new-card/new-card.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonCardHeaderComponent } from './components/pokemon-card/pokemon-card-header/pokemon-card-header.component';
import { PokemonCardBodyComponent } from './components/pokemon-card/pokemon-card-body/pokemon-card-body.component';
import { PokemonCardFooterComponent } from './components/pokemon-card/pokemon-card-footer/pokemon-card-footer.component';
import { ChipsComponent } from './components/chips/chips.component';
import { MyPackTableComponent } from './components/my-pack-table/my-pack-table.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

// directives
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';

// pipes
import { TruncatePipe } from './pipes/truncate.pipe';

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
    ChipsComponent,
    InfiniteScrollDirective,
    TruncatePipe,
    MyPackTableComponent,
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
    ChipsComponent,
    InfiniteScrollDirective,
    TruncatePipe,
    MyPackTableComponent,
  ],
  imports: [
    CommonModule,
    IgxGridModule,
    IgxActionStripModule,
    IgxIconModule,
    IgxDialogModule,
    IgxButtonModule,
    IgxFocusModule,
    FormsModule
  ],
})
export class SharedModule {}
