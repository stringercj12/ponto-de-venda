import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  items = [
    {
      label: 'Venda',
      icon: 'ph ph-money-wavy',
      link: '/venda'
    },
    {
      label: 'Mesas',
      icon: 'ph ph-fork-knife',
      link: '/mesas'
    },
    {
      label: 'Comandas',
      icon: 'ph ph-scroll',
      link: '/comandas'
    },
    {
      label: 'Pedidos',
      icon: 'ph ph-clipboard-text',
      link: '/pedido'
    },
    {
      label: 'Delivery',
      icon: 'ph ph-motorcycle',
      link: '/delivery'
    },
    {
      label: 'Caixa',
      icon: 'ph ph-cash-register',      
      link: '/caixa'
    }
  ]

}