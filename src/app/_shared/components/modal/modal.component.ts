import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-modal',
  imports: [NgClass],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() visible: boolean = false;
  @Input() title: string = 'Titulo modal';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() isOpen: boolean = false;
  @Input() closeOnBackdropClick: boolean = true;
  @Input() showCloseButton: boolean = true;
  @Input() showFooter: boolean = true;
  @Output() close = new EventEmitter<boolean>();


  ngOnInit() {
    console.log('ModalComponent initialized');
  }

  closeModal() {
    this.close.emit(false);
  }

  onBackd10pClick() {
    this.closeModal();
  }
}
