import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { TableService } from '../../_shared/services/table.service';

// export enum TableStatus {
//   'indisponivel',
//   'disponivel',
//   'ocupada',
//   'fechamento',
//   'livre',
//   'reservada'
// }

type TableStatus = 'disponivel' | 'ocupada' | 'reservada' | 'indisponivel' | 'fechamento' | 'livre';

@Component({
  selector: 'app-mesas',
  imports: [DatePipe, TitleCasePipe, ReactiveFormsModule],
  templateUrl: './mesas.component.html',
  styleUrl: './mesas.component.css'
})
export class MesasComponent {

  tables = signal<any[]>([]);
  loadingUpdateTableStatus = signal<boolean>(false);
  tableSelected = signal<any>(null);

  originalTables: any[] = [];
  filteredTables: any[] = [];

  formContrlSearhch: FormControl = new FormControl('');


  constructor(private tableService: TableService, private ngxSpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.loadTables();
  }

  loadTables() {

    this.ngxSpinnerService.show();
    this.tableService.getAllTables().subscribe({
      next: (data: any) => {
        console.log(data.mesas)
        this.originalTables = data.mesas;
        this.filteredTables = data.mesas;
        this.setupSearchControl();
        this.ngxSpinnerService.hide();
      },
      error: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  setupSearchControl(): void {
    this.formContrlSearhch.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        console.log('Search value changed:', value);

        const searchValue = value?.toLowerCase();

        if (!searchValue) {
          this.filteredTables = this.originalTables;
          return;
        }

        this.filteredTables = this.originalTables.filter(table => {
          return table.nome.toLowerCase().includes(searchValue) ||
            table.id.toString() === searchValue;
        });
      });
  }

  public getStatusBackgroundClass(status: TableStatus | undefined): string {
    if (!status) return 'bg-gray-100 border-gray-300';

    switch (status) {
      case 'livre':
        return 'bg-emerald-200 border-emerald-500'; // Verde claro para livre
      case 'disponivel':
        return 'bg-blue-100 border-blue-200';
      case 'ocupada':
        return 'bg-red-100 border-red-200';      // Vermelho forte para ocupada
      case 'reservada':
        return 'bg-purple-100 border-purple-200';     // Azul para reservada
      case 'fechamento':
        return 'bg-yellow-100 border-yellow-300';   // Amarelo para fechamento
      case 'indisponivel':
        return 'bg-gray-200 border-gray-200';     // Cinza para indisponível
      default:
        return 'bg-white';
    }
  }

  public getStatusTextClass(status: TableStatus | undefined): string {
    if (!status) return 'text-gray-800';

    switch (status) {
      case 'livre':
        return 'text-emerald-800'; //
      case 'disponivel':
        return 'text-blue-800'; // Verde claro para livre
      case 'ocupada':
        return 'text-red-800';      // Vermelho forte para ocupada
      case 'reservada':
        return 'text-purple-800';     // Azul para reservada
      case 'fechamento':
        return 'text-yellow-800';   // Amarelo para fechamento
      case 'indisponivel':
        return 'text-gray-800';     // Cinza para indisponível
      default:
        return 'text-white';
    }
  }

  openTableOptions(table: any) {
    console.log('Open options for table:', table);
    // Lógica para abrir opções da mesa

    this.tableSelected.set(table);
    this.loadingUpdateTableStatus.set(true);
    this.tableService.updateTableStatus(table.id, 'reservada').subscribe((response: any) => {
      console.log('Table status updated:', response);
      this.ngOnInit();
    });
  }
}
