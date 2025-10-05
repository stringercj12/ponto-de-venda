import { Component } from '@angular/core';

@Component({
  selector: 'app-filtro-produto-categoria',
  imports: [],
  templateUrl: './filtro-produto-categoria.component.html',
  styleUrl: './filtro-produto-categoria.component.css'
})
export class FiltroProdutoCategoriaComponent {

  selectedCategoryId = 0;

  categories = [
    {
      id: 0,
      name: 'Todos',
      icon: 'assets/icons/categoria-todos.svg',
      selected: true,
    },
    {
      id: 1,
      name: 'Bebidas',
      icon: 'assets/icons/categoria-bebidas.svg',
      selected: false,
    },
    {
      id: 2,
      name: 'Lanches',
      icon: 'assets/icons/categoria-lanches.svg',
      selected: false,
    },
    {
      id: 3,
      name: 'Sobremesas',
      icon: 'assets/icons/categoria-sobremesas.svg',
      selected: false,
    },
    {
      id: 4,
      name: 'Acompanhamentos',
      icon: 'assets/icons/categoria-acompanhamentos.svg',
      selected: false,
    },
    {
      id: 5,
      name: 'Combos',
      icon: 'assets/icons/categoria-combos.svg',
      selected: false,
    },
    {
      id: 6,
      name: 'Promoções',
      icon: 'assets/icons/categoria-promocoes.svg',
      selected: false,
    },
  ]

  scrollLeft() {
    console.log('scrollLeft');
  }

  scrollRight() {
    console.log('scrollRight');
  }

  selectCategory(categoryId: any) {
    this.selectedCategoryId = categoryId;
    this.categories.map(category => {
      category.selected = category.id === categoryId;
    });
  }
}
