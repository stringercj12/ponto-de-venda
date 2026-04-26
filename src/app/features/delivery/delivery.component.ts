import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery',
  imports: [],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css',
})
export class DeliveryComponent implements OnInit {
  items: Array<any> = [];
  loading: boolean = true;
  changeDetection = inject(ChangeDetectorRef);
  selectedItem: {
    id: number;
    name: string;
    description: string;
    date: string;
    time: string;
    status: string;
    total: string;
    money: number;
    logo: string;
    selected: boolean;
    quantity?: number;
  } | null = null;

  ngOnInit() {
    setTimeout(() => {
      this.loading = false
      this.items = new Array(30).fill(0).map((_, i) => ({
        id: i + 1,
        name: `Jorge Renato Bartolo Cordeiro Ferreira`,
        description: `Description for Item ${i + 1}`,
        date: new Date(2025, 10, 30 + i).toLocaleDateString(),
        time: new Date(2025, 10, 30 + i, 11, 12).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: i % 2 === 0 ? i % 3 === 1 ? 'Pending' : 'Preparing' : 'Completed',
        total: `R$ ${(i + 1) * 10},00`,
        money: (i + 1) * 10 + 0.5,
        quantity: i % 2 === 0 ? i + 1 : undefined,
        logo: i % 2 === 0 ? 'https://logodownload.org/wp-content/uploads/2017/05/ifood-logo-0.png' : 'https://t2.tudocdn.net/664362?w=1200&h=1200',
        selected: false
      }))
      this.changeDetection.detectChanges();
      console.log('Items loaded:', this.items);
    }, 6000);

  }


  selectItem(item: any) {
    console.log('Selected item:', item);
    this.items.forEach(i => i.selected = false);
    item.selected = !item.selected;
    this.selectedItem = item.selected ? item : null;
  }
}
