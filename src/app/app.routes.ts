import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'mesas',
    loadComponent: () => import('./features/mesas/mesas.component').then(m => m.MesasComponent)
  },
  {
    path: 'venda',
    loadComponent: () => import('./features/venda/venda').then(m => m.Venda)
  },
  {
    path: 'delivery',
    loadComponent: () => import('./features/delivery/delivery.component').then(m => m.DeliveryComponent)
  },
  {
    path: 'comandas',
    loadComponent: () => import('./features/comanda/comanda.component').then(m => m.ComandaComponent)
  }
];
