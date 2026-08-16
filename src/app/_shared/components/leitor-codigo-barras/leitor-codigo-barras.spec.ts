import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeitorCodigoBarras } from './leitor-codigo-barras';

describe('LeitorCodigoBarras', () => {
  let component: LeitorCodigoBarras;
  let fixture: ComponentFixture<LeitorCodigoBarras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeitorCodigoBarras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeitorCodigoBarras);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
