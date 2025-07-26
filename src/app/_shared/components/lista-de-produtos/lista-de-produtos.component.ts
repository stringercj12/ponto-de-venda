import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-de-produtos',
  imports: [],
  templateUrl: './lista-de-produtos.component.html',
  styleUrl: './lista-de-produtos.component.css'
})
export class ListaDeProdutosComponent {
  items = new Array(100).fill(0).map((_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    description: `Description for Item ${i + 1}`,
    date: new Date(2025, 10, 30 + i).toLocaleDateString(),
    time: new Date(2025, 10, 30 + i, 11, 12).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: i % 2 === 0 ? i % 3 === 1 ? 'Pending' : 'Preparing' : 'Completed',
    total: `R$ ${(i + 1) * 10},00`,
    money: (i + 1) * 10 + 0.5,
    quantity: i % 2 === 0 ? i + 1 : undefined,
    selected: false
  }))
}
