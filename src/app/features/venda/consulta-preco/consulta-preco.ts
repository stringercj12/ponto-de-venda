import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProdutoService } from '../../../_shared/services/produto.service';

@Component({
  selector: 'app-consulta-preco',
  imports: [FormsModule, CurrencyPipe, SlicePipe],
  templateUrl: './consulta-preco.html',
  styleUrl: './consulta-preco.css'
})
export class ConsultaPreco {
  @Input() search: string = '';
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
    this.produtoService.getAllProdutos().subscribe({
      next: (data: any) => {
        console.log(data.produtos);
        this.ngxSpinnerService.hide();
        this.produtos.set(data.produtos);
      }
    });
  }
}
