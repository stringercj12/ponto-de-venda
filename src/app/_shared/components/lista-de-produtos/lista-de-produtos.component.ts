import { Component, Input, input, signal } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { CurrencyPipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-lista-de-produtos',
  imports: [CurrencyPipe],
  templateUrl: './lista-de-produtos.component.html',
  styleUrl: './lista-de-produtos.component.css'
})
export class ListaDeProdutosComponent {

  @Input() idCategoria: number = 0;

  produtos = signal<any[]>([]);

  constructor(private produtoService: ProdutoService, private ngxSpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.loadProdutos();
  }

  ngOnChanges() {
    this.loadProdutos();
  }

  loadProdutos() {

    this.ngxSpinnerService.show();
    if (this.idCategoria != 0) {
      this.produtoService.getProdutoBycategoria(this.idCategoria).subscribe({
        next: (data: any) => {
          console.log(data.produtos);
          this.ngxSpinnerService.hide();
          this.produtos.set(data.produtos);
        }
      });
    } else {
      this.produtoService.getAllProdutos().subscribe({
        next: (data: any) => {
          console.log(data.produtos);
          this.ngxSpinnerService.hide();
          this.produtos.set(data.produtos);
        }
      });
    }
  }
}
