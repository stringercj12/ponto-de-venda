import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { FiltroProdutoCategoriaComponent } from "../../_shared/components/filtro-produto-categoria/filtro-produto-categoria.component";
import { ListaDeProdutosComponent } from "../../_shared/components/lista-de-produtos/lista-de-produtos.component";
import { ConsultaPreco } from "./consulta-preco/consulta-preco";
import { ModalComponent } from "../../_shared/components/modal/modal.component";
import { ProdutoService } from '../../_shared/services/produto.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-venda',
  imports: [ReactiveFormsModule, FiltroProdutoCategoriaComponent, ListaDeProdutosComponent, ConsultaPreco, ModalComponent],
  templateUrl: './venda.html',
  styleUrl: './venda.css'
})
export class Venda {

  isConsultaPrecoOpen = false;
  codigoDoProduto = '';
  idCategoriaSelecionada: number = 0;

  form: FormGroup = new FormGroup({
    codigo: new FormControl('', [Validators.required]),
    quantidade: new FormControl(1, [Validators.required, Validators.min(1)])
  });

  constructor(
    private produtoService: ProdutoService,
    private ngxSpinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {

  }

  aumentarQuantidade() {
    const quantidadeAtual = this.form.get('quantidade')?.value || 1;
    this.form.patchValue({ quantidade: quantidadeAtual + 1 });
  }

  diminuirQuantidade() {
    const quantidadeAtual = this.form.get('quantidade')?.value || 1;
    if (quantidadeAtual > 1) {
      this.form.patchValue({ quantidade: quantidadeAtual - 1 });
    }
  }

  procurarProdutoPeloCodigo(event: any) {
    console.log('procurarProdutoPeloCodigo => ', event.target.value);
    this.codigoDoProduto = event.target.value;
    this.form.patchValue({ codigo: event.target.value });

    this.produtoService.getProdutoByCodigo(this.codigoDoProduto).subscribe({
      next: (data: any) => {
        console.log('Produto encontrado: ', data.produto);
        this.isConsultaPrecoOpen = false;
      },
      error: (error: any) => {
        console.log('Produto não encontrado, abrindo consulta de preço.');
        this.isConsultaPrecoOpen = true;
      }
    });
    // Se o código estiver correto a um produto realiza a adição do produto na venda
    //  Se não encontrar o produto, abre a modal de consulta de preço
  }
}
