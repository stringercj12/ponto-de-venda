import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consulta-preco',
  imports: [FormsModule],
  templateUrl: './consulta-preco.html',
  styleUrl: './consulta-preco.css'
})
export class ConsultaPreco {
  @Input() search: string = '';
}
