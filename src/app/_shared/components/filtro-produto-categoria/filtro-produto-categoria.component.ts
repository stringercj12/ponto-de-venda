import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from '../../services/category.service';
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

  responsiveOptions: any[] | undefined;

  constructor(private categoryService: CategoryService, private ngxSpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.loadCategories();

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
      }
    ]
  }

  loadCategories() {
    this.ngxSpinnerService.show();
    this.categoryService.listCategories().subscribe({
      next: (response) => {
        this.categories.set(response);
        this.ngxSpinnerService.hide();
      },
      error: () => {
        this.categories.set([]);
        this.ngxSpinnerService.hide();
      }
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
      category.selecionado = category.id === categoryId;
    });
  }
}
