import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrirCaixa } from './abrir-caixa';

describe('AbrirCaixa', () => {
  let component: AbrirCaixa;
  let fixture: ComponentFixture<AbrirCaixa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbrirCaixa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbrirCaixa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
