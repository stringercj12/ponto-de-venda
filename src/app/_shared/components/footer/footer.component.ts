import { Component, computed, signal } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  // Estado centralizado via Signal
  readonly config = signal({
    version: '1.0.0',
    buildDate: '2024-06-01',
    ambient: 'PRODUÇÃO', // Ex: environment.ambient
    caixa: '01',
    pdv: 'TERMINAL-PDV-01',
    user: 'ADMIN MASTER',
    printer: 'EPSON-TM-T20',
    isPrinterOnline: true // Status dinâmico
  });

  // Computed para facilitar classes de CSS baseadas no ambiente
  readonly isProd = computed(() => this.config().ambient === 'PRODUÇÃO');
}
