import { Dialog, DialogModule } from "@angular/cdk/dialog";
import { CdkMenuModule } from "@angular/cdk/menu";
import { NgClass } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { NavigationEnd, RouterLink, Router } from "@angular/router";
import { filter, map } from "rxjs";
import { AbrirCaixa } from "../../caixa/abrir-caixa/abrir-caixa";



type MenuItemExtended = {
  label?: string;
  icon?: string;
  routerLink?: string;
  isOpenModal?: boolean;
  separator?: boolean;
  command?: (event: MenuItemExtended) => void;
  styleClass?: string;
};


@Component({
  selector: 'app-header',
  standalone: true, // Certifique-se de que é standalone
  imports: [RouterLink, NgClass, CdkMenuModule, DialogModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private readonly router = inject(Router);
  private readonly dialogService = inject(Dialog);

  // 1. Definição Limpa dos Itens
  readonly items = signal<MenuItemExtended[]>([
    { label: 'Venda', icon: 'ph ph-money-wavy', routerLink: '/venda' },
    { label: 'Mesas', icon: 'ph ph-fork-knife', routerLink: '/mesas' },
    { label: 'Comandas', icon: 'ph ph-scroll', routerLink: '/comandas' },
    { label: 'Pedidos', icon: 'ph ph-clipboard-text', routerLink: '/pedido' },
    { label: 'Delivery', icon: 'ph ph-motorcycle', routerLink: '/delivery' },
    { label: 'Caixa', icon: 'ph ph-cash-register', routerLink: '/caixa', isOpenModal: true }
  ]);

  readonly userMenuItems = signal<MenuItemExtended[]>([
    { label: 'Perfil', icon: 'ph ph-user', routerLink: '/perfil' },
    { label: 'Configurações', icon: 'ph ph-gear-six', routerLink: '/configuracoes' },
    { separator: true },
    { label: 'Sair', icon: 'ph ph-sign-out', command: () => this.logout(), styleClass: 'text-red-600' }
  ]);

  // 2. Única fonte de verdade para a URL
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url)
    ),
    { initialValue: this.router.url }
  );

  // 3. Computed Simplificado: O find deve ser a única lógica de seleção
  readonly itemSelected = computed(() => {
    const url = this.currentUrl();
    return this.items().find(item => item.routerLink && url.startsWith(item.routerLink)) ?? null;
  });

  navigateItem(item: MenuItemExtended) {
    if (item.isOpenModal) {
      this.dialogService.open(AbrirCaixa, {
        minWidth: '800px',
        panelClass: 'custom-dialog-container'
      });
      return;
    }
    if (item.routerLink) this.router.navigate([item.routerLink]);
  }

  private logout() {
    console.log('Logout executado');
  }
}