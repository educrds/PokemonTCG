import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NovoBaralhoComponent } from './pages/novo-baralho/novo-baralho.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'meu-baralho',
    component: NovoBaralhoComponent,
  },
];