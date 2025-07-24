import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroProdutoCategoriaComponent } from './filtro-produto-categoria.component';

describe('FiltroProdutoCategoriaComponent', () => {
  let component: FiltroProdutoCategoriaComponent;
  let fixture: ComponentFixture<FiltroProdutoCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroProdutoCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroProdutoCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
