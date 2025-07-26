import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeVendedoresComponent } from './lista-de-vendedores.component';

describe('ListaDeVendedoresComponent', () => {
  let component: ListaDeVendedoresComponent;
  let fixture: ComponentFixture<ListaDeVendedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDeVendedoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDeVendedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
