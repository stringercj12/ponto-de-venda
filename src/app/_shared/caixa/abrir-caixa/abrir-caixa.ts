import { Component, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-abrir-caixa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './abrir-caixa.html',
})
export class AbrirCaixa {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogRef = inject(DialogRef<AbrirCaixa>);
  private readonly router = inject(Router);

  // Form estruturado: Centraliza o estado e facilita validação
  form = this.fb.group({
    caixa: ['Caixa 01', Validators.required],
    responsavel: ['João Silva', Validators.required],
    data: [new Date().toISOString().split('T')[0], Validators.required],
    hora: [new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), Validators.required],
    valorFundo: [0, [Validators.required, Validators.min(0)]],
    tipoPagamento: ['dinheiro']
  });

  tecladoNumerico = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ',', 'DEL'];

  tiposPagamento = signal([
    { label: 'Dinheiro', value: 'dinheiro', icon: 'ph ph-money' },
    { label: 'Cheque', value: 'cheque', icon: 'ph ph-file-text' },
    { label: 'Cartão de Crédito', value: 'cartao_credito', icon: 'ph ph-credit-card' },
    { label: 'Cartão de Débito', value: 'cartao_debito', icon: 'ph ph-credit-card' },
    { label: 'Crédito Loja', value: 'credito_loja', icon: 'ph ph-shopping-bag' },
    { label: 'Vale Alimentação', value: 'vale_alimentacao', icon: 'ph ph-cooking-pot' },
    { label: 'Vale Refeição', value: 'vale_refeicao', icon: 'ph ph-fork-knife' },
    { label: 'Vale Presente', value: 'vale_presente', icon: 'ph ph-gift' },
    { label: 'Vale Combustível', value: 'vale_combustivel', icon: 'ph ph-gas-pump' },
    { label: 'Contas A Receber', value: 'contas_a_receber', icon: 'ph ph-file-text' },
    { label: 'Pix', value: 'pix', icon: 'ph ph-pix-logo' },
    { label: 'Outros', value: 'outros', icon: 'ph ph-dots-three-outline' }
  ]);

  handleTeclado(tecla: string) {
    const atual = this.form.controls.valorFundo.value.toString();

    if (tecla === 'DEL') {
      this.form.patchValue({ valorFundo: 0 });
      return;
    }

    if (tecla === ',') return;

    const novoValor = parseFloat(atual === '0' ? tecla : atual + tecla);
    this.form.patchValue({ valorFundo: novoValor });
  }

  confirmarAbertura() {
    if (this.form.invalid) return;

    console.log('Dados de Abertura:', this.form.getRawValue());
    this.router.navigate(['/venda']);
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
