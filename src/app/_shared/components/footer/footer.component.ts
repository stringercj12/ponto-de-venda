import { Component } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  config = {
    version: '1.0.0',
    buildDate: '2024-06-01',
    ambient: environment.ambient,
    caixa: 'PDV-01',
    pdv: 'PDV-01',
    user: 'Admin',
    printer: 'Printer-01'
  }
}
