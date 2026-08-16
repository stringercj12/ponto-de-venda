import { Component, computed, Input, input, output, signal } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { CurrencyPipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product, ProductListResponse } from '../../interfaces/product';
import { Produto } from 'src/app/features/venda/venda';

@Component({
  selector: 'app-lista-de-produtos',
  imports: [CurrencyPipe],
  templateUrl: './lista-de-produtos.component.html',
  styleUrl: './lista-de-produtos.component.css'
})
export class ListaDeProdutosComponent {

  categoriaId = input<string | null>(null);
  selecionar = output<any>();

  produtos = signal<ProductListResponse[]>([]);


  // Dados mockados
  private todosProdutos = computed(() => {
    return this.produtos();
  });

  // Filtro reativo usando computed
  produtosFiltrados = computed(() => {
    const categoriaId = this.categoriaId();
    if (!categoriaId) return this.todosProdutos();
    return this.todosProdutos().filter(produto => produto.categories.includes(categoriaId));
  });


  constructor(private produtoService: ProdutoService, private ngxSpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.loadProdutos();
  }

  ngOnChanges() {
    this.loadProdutos();
  }

  loadProdutos() {

    this.ngxSpinnerService.show();
    if (this.categoriaId() != null) {
      this.produtoService.getProdutoBycategoria(this.categoriaId()!).subscribe({
        next: (data) => {
          this.ngxSpinnerService.hide();
          this.produtos.set(data);
        },
        error: () => {
          this.produtos.set([]);
          this.ngxSpinnerService.hide();
        }
      });
    } else {
      this.produtoService.getAllProdutos().subscribe({
        next: (data) => {
          this.ngxSpinnerService.hide();
          this.produtos.set(data);
        },
        error: () => {
          this.produtos.set([]);
          this.ngxSpinnerService.hide();
        }
      });
    }
  }
}
