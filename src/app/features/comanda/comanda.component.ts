import { Dialog } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FiltroProdutoCategoriaComponent } from "../../_shared/components/filtro-produto-categoria/filtro-produto-categoria.component";
import { ListaDeProdutosComponent } from '../../_shared/components/lista-de-produtos/lista-de-produtos.component';
import { ListaDeVendedoresComponent } from '../../_shared/components/lista-de-vendedores/lista-de-vendedores.component';

@Component({
  selector: 'app-comanda',
  imports: [ReactiveFormsModule, FiltroProdutoCategoriaComponent, ListaDeProdutosComponent],
  templateUrl: './comanda.component.html',
  styleUrl: './comanda.component.css'
})
export class ComandaComponent {
  modalService = inject(Dialog);

  form: FormGroup = new FormGroup({
    codigo: new FormControl('', [Validators.required]),
    quantidade: new FormControl(1, [Validators.required, Validators.min(1)])
  });

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

  abrirModal() {
    this.modalService.open(ListaDeVendedoresComponent, {
      width: '400px',
      height: '300px',
    });
  }
}
