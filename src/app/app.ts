import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./_shared/components/header/header";
import { FooterComponent } from "./_shared/components/footer/footer.component";
import { NgxSpinnerComponent } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, FooterComponent, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pdv');
}
