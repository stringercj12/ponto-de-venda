import { Component, Injectable, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  @ViewChild('app-root', { static: true }) modalTemplate!: TemplateRef<any>;
  private modalComponentRef!: ViewContainerRef;

  constructor() { }

  openModal<T>(component: Type<T>, options: { title?: string } = {}) {
    if(!this.modalComponentRef) return;
    const modalElement = this.modalComponentRef.createComponent(component);
    modalElement.instance.title = options.title || 'Modal Title';
    modalElement.instance.visible = true;
  }
}
