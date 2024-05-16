import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { NewCardComponent } from './components/new-card/new-card.component';

@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    ButtonComponent,
    CardComponent,
    NewCardComponent
  ],
  exports: [
    NavbarComponent,
    HeaderComponent,
    ButtonComponent,
    CardComponent,
    NewCardComponent
  ],
  imports: [
    CommonModule,
  ],
})
export class SharedModule { }
