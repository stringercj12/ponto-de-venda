import { Dialog } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, HostListener, inject, output, resource, signal, viewChild } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AbrirCaixa } from 'src/app/_shared/caixa/abrir-caixa/abrir-caixa';
import { ListaDeProdutosComponent } from "src/app/_shared/components/lista-de-produtos/lista-de-produtos.component";
import { Product } from 'src/app/_shared/interfaces/product';
import { CategoryService } from 'src/app/_shared/services/category.service';
import { ProdutoService } from 'src/app/_shared/services/produto.service';

interface CarrinhoItem {
  id: number;
  nome: string;
  quantidade: number;
  precoUnitario: number;
}

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoriaId: number;
  imagem?: string;
  cor?: string; // Cor para o botão se não houver imagem
}

@Component({
  selector: 'app-venda-pdv',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ListaDeProdutosComponent],
  templateUrl: './venda.html',
  styleUrls: ['./venda.css']
})
export class Venda {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogService = inject(Dialog);
  private readonly categoriaService = inject(CategoryService)
  private readonly produtoService = inject(ProdutoService)

  skuInput = viewChild<ElementRef<HTMLInputElement>>('skuInput');

  itensCarrinho = signal<CarrinhoItem[]>([]);
  idCategoriaSelecionada = signal<string | null>(null);
  skuError = signal(false);

  valorTotal = computed(() =>
    this.itensCarrinho().reduce((acc, item) => acc + (item.quantidade * item.precoUnitario), 0)
  );

  form = this.fb.group({
    codigo: ['', [Validators.required]],
    quantidade: [1, [Validators.required, Validators.min(1)]]
  });

  categoriyEvent = output<string | null>();
  categoriaId = signal<string | null>(null);

  categoriaResource = resource({
    loader: () => firstValueFrom(this.categoriaService.listCategories()).then(response => response),
  });

  categorias = computed(() => this.categoriaResource.value() ?? []);


  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'F2':
        event.preventDefault();
        this.skuInput()?.nativeElement.focus();
        break;
      case 'F10':
        event.preventDefault();
        this.finalizarVenda();
        break;
      case 'Escape':
        this.cancelarVenda();
        break;
    }

  }

  alterarQuantidade(delta: number) {
    const atual = this.form.controls.quantidade.value;
    if (atual + delta >= 1) {
      this.form.patchValue({ quantidade: atual + delta });
    }
  }

  procurarProdutoPeloCodigo() {
    const sku = this.form.value.codigo;
    if (!sku) return;

    this.produtoService.getProdutoByCodigo(sku).subscribe({
      next: (produto) => {
        if (produto) {
          this.adicionarAoCarrinho(produto);
        } else {
          this.triggerError();
        }
      },
      error: () => this.triggerError()
    });
  }

  adicionarAoCarrinho(produto: Product) {
    this.itensCarrinho.update(itens => {
      const existente = itens.find(i => i.id === produto.id);
      if (existente) {
        return itens.map(i => i.id === produto.id
          ? { ...i, quantidade: i.quantidade + this.form.value.quantidade! }
          : i
        );
      }
      return [{
        id: produto.id,
        nome: produto.name,
        quantidade: this.form.value.quantidade!,
        precoUnitario: produto.price
      }, ...itens];
    });

    this.form.reset({ codigo: '', quantidade: 1 });
    this.skuInput()?.nativeElement.focus();
  }

  triggerError() {
    this.skuError.set(true);
    setTimeout(() => this.skuError.set(false), 500);
  }

  cancelarVenda() {
    if (this.itensCarrinho().length > 0 && confirm('Cancelar venda atual?')) {
      this.itensCarrinho.set([]);
    }
  }

  finalizarVenda() {
    if (this.itensCarrinho().length === 0) return;
    console.log('Finalizando venda...', this.itensCarrinho());

    this.dialogService.open(AbrirCaixa, {
      minWidth: '800px',
      panelClass: 'custom-dialog-container'
    });
    return;
  }
}
