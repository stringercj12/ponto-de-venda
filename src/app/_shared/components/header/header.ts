import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { NgClass } from '@angular/common';
import { Popover, PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass,
    MenuModule,
    ToolbarModule,
    ButtonModule,
    MenubarModule,
    TieredMenuModule,
    AvatarModule,
    PopoverModule,
  ],
  providers: [Popover],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  @ViewChild('userDropdown') userDropdown!: Popover;

  items: MenuItem[] = [
    {
      label: 'Venda',
      icon: 'ph ph-money-wavy',
      routerLink: '/venda'
    },
    {
      label: 'Mesas',
      icon: 'ph ph-fork-knife',
      routerLink: '/mesas'
    },
    {
      label: 'Comandas',
      icon: 'ph ph-scroll',
      routerLink: '/comandas'
    },
    {
      label: 'Pedidos',
      icon: 'ph ph-clipboard-text',
      routerLink: '/pedido'
    },
    {
      label: 'Delivery',
      icon: 'ph ph-motorcycle',
      routerLink: '/delivery'
    },
    {
      label: 'Caixa',
      icon: 'ph ph-cash-register',
      routerLink: '/caixa'
    }
  ]

  userMenuItems: MenuItem[] = [
    {
      label: 'Perfil',
      icon: 'pi pi-user',
      routerLink: '/perfil'
    },
    {
      label: 'Configurações',
      icon: 'pi pi-cog',
      routerLink: '/configuracoes'
    },
    {
      separator: true
    },
    {
      label: 'Sair',
      icon: 'pi pi-sign-out',
      command: (event: MenuItemCommandEvent) => {
        // Lógica de logout aqui
        console.log('Usuário deslogado');
      },
      styleClass: 'text-red-500' // Classe para estilizar o item "Sair"
    }
  ];

}