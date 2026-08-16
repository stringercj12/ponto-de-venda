import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { TableService } from '../../_shared/services/table.service';
import { CdkMenuModule } from '@angular/cdk/menu';
import { Table, TableStatus, TableStatusEnum } from 'src/app/_shared/interfaces/tables';
import { toast } from 'ngx-sonner';


@Component({
  selector: 'app-mesas',
  imports: [DatePipe, TitleCasePipe, ReactiveFormsModule, CdkMenuModule, CurrencyPipe],
  providers: [TableService, NgxSpinnerService],
  templateUrl: './mesas.component.html',
  styleUrl: './mesas.component.css'
})
export class MesasComponent {

  tables = signal<Table[]>([]);
  loadingUpdateTableStatus = signal<boolean>(false);
  tableSelected = signal<Table | null>(null);

  originalTables = signal<Table[]>([]);
  filteredTables = signal<Table[]>([{
    id: `8F810789-91C0-434B-BDB8-63DF83BDAADA`,
    name: 'dsdddsd',
    status: 'Occupied',
    number: 202,
    capacity: 222,
    description: 'dedsd',
    statusDescription: 'Ocupada',
    createdAt: '8F810789-91C0-434B-BDB8-63DF83BDAADA',
    updatedAt: '8F810789-91C0-434B-BDB8-63DF83BDAADA'
  }]);

  public readonly TableStatusEnum = TableStatusEnum;

  formContrlSearhch: FormControl = new FormControl('');

  private readonly tableService: TableService = inject(TableService);
  private readonly ngxSpinnerService: NgxSpinnerService = inject(NgxSpinnerService);

  // Mapeamento de Cores para Background e Borda Card
  readonly statusBackgroundMap: Record<TableStatus, string> = {
    [TableStatusEnum.Unavailable]: 'bg-gray-100 border-gray-300',
    [TableStatusEnum.Occupied]: 'bg-red-50 border-red-200',
    [TableStatusEnum.Closed]: 'bg-yellow-50 border-yellow-200',
    [TableStatusEnum.Free]: 'bg-emerald-50 border-emerald-200',
    [TableStatusEnum.Reserved]: 'bg-purple-50 border-purple-200',
  };

  // Mapeamento de Cores para Texto
  readonly statusTextMap: Record<TableStatus, string> = {
    [TableStatusEnum.Unavailable]: 'text-gray-600',
    [TableStatusEnum.Occupied]: 'text-red-600',
    [TableStatusEnum.Closed]: 'text-yellow-700',
    [TableStatusEnum.Free]: 'text-emerald-600',
    [TableStatusEnum.Reserved]: 'text-purple-600',
  };

  ngOnInit() {
    // this.loadTables();
  }

  loadTables() {

    this.ngxSpinnerService.show();
    this.tableService.getAllTables().subscribe({
      next: (data: any) => {
        console.log(data)
        this.originalTables.set(data);
        this.filteredTables.set(data);
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
          this.filteredTables.set(this.originalTables());
          return;
        }

        this.filteredTables.set(this.originalTables().filter(table => {
          return table.name.toLowerCase().includes(searchValue) ||
            table.id.toString() === searchValue;
        }));
      });
  }

  getStatusBackgroundClass(status: TableStatus): string {
    return this.statusBackgroundMap[status] ?? 'bg-white border-gray-200';
  }

  getStatusTextClass(status: TableStatus): string {
    return this.statusTextMap[status] ?? 'text-gray-500';
  }

  openTableOptions(table: any, status: TableStatus = 'Free') {
    this.tableSelected.set(table);
    this.loadingUpdateTableStatus.set(true);

    this.tableService.updateTableStatus(table.id, status).subscribe({
      next: (response: any) => {
        this.loadingUpdateTableStatus.set(false);
        this.tableSelected.set(null);
        toast.success('Table status updated:', response)
        this.loadTables();
      },
      error: (error) => {
        toast.error('Error updating table status:', error);
        this.loadingUpdateTableStatus.set(false);
        this.tableSelected.set(null);
      }
    });
  }

  openCreateTableModal() {
    console.log('Table created:');
    this.tableService.createTable({ name: 'Mesa ' + (this.originalTables().length + 1), capacity: 20, number: 202, description: `` }).subscribe({
      next: (response: any) => {
        console.log('Table created:', response);
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error creating table:', error);
      }
    });
  }

  adicionarMesa() {
    // this.tableService.createTable().subscribe({
    //   next: (data: any) => {
    //     console.log('Mesa criada: ', data);
    //     this.loadTables();
    //   },
    //   error: (error) => {
    //     console.error('Erro ao criar mesa: ', error);
    //   }
    // }); 
  }


  // No Componente (.ts)
  canChangeStatus(currentStatus: TableStatus, targetStatus: TableStatusEnum): boolean {
    console.log('currentStatuss', currentStatus)
    console.log('targetStatus', targetStatus)
    if (currentStatus === targetStatus) return false;

    const allowedTransitions: Record<TableStatusEnum, TableStatusEnum[]> = {
      [TableStatusEnum.Free]: [TableStatusEnum.Occupied, TableStatusEnum.Reserved, TableStatusEnum.Unavailable],
      [TableStatusEnum.Occupied]: [TableStatusEnum.Free, TableStatusEnum.Closed],
      [TableStatusEnum.Reserved]: [TableStatusEnum.Free, TableStatusEnum.Occupied],
      [TableStatusEnum.Closed]: [TableStatusEnum.Free, TableStatusEnum.Occupied],
      [TableStatusEnum.Unavailable]: [TableStatusEnum.Free],
    };

    return allowedTransitions[currentStatus]?.includes(targetStatus) ?? false;
  }
}
