import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPreco } from './consulta-preco';

describe('ConsultaPreco', () => {
  let component: ConsultaPreco;
  let fixture: ComponentFixture<ConsultaPreco>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaPreco]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaPreco);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
