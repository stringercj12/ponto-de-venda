import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  visible: boolean = false;
  title: string = 'Titulo modal';

  ngOnInit() {
    console.log('ModalComponent initialized');
  }

  closeModal() {

  }

  onBackd10pClick(){
    this.closeModal();
  }
}
