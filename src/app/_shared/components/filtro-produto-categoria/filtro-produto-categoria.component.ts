import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-filtro-produto-categoria',
  imports: [TitleCasePipe],
  templateUrl: './filtro-produto-categoria.component.html',
  styleUrl: './filtro-produto-categoria.component.css'
})
export class FiltroProdutoCategoriaComponent {

  selectedCategoryId: number = 0;

  categories = signal<any[]>([]);
  @Output() categoriyEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor(private categoryService: CategoryService, private ngxSpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.ngxSpinnerService.show();
    this.categoryService.listCategories().subscribe((data: any) => {
      console.log(data.categorias);
      this.categories.set(data.categorias);
      this.ngxSpinnerService.hide();
    });
  }

  scrollLeft() {
    console.log('scrollLeft');
  }

  scrollRight() {
    console.log('scrollRight');
  }

  selectCategory(categoryId: number) {
    this.selectedCategoryId = categoryId;
    this.categoriyEvent.emit(categoryId);
    this.categories().map(category => {
      category.selected = category.id === categoryId;
    });
  }
}
