import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FiltroProdutoCategoriaComponent } from "../../_shared/components/filtro-produto-categoria/filtro-produto-categoria.component";
import { ListaDeProdutosComponent } from '../../_shared/components/lista-de-produtos/lista-de-produtos.component';

@Component({
  selector: 'app-comanda',
  imports: [ReactiveFormsModule, FiltroProdutoCategoriaComponent, ListaDeProdutosComponent],
  templateUrl: './comanda.component.html',
  styleUrl: './comanda.component.css'
})
export class ComandaComponent {
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
}
