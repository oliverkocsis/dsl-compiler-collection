import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ProductBacklogItem } from '../product-backlog-item';
import { ProductBacklogItemService } from '../product-backlog-item.service';

@Component({
  selector: 'app-product-backlog-item-table',
  templateUrl: './product-backlog-item-table.component.html',
  styleUrls: ['./product-backlog-item-table.component.scss']
})
export class ProductBacklogItemTableComponent implements OnInit, OnDestroy {
  displayedColumns = [
    'name', 
    'description', 
    'order', 
    'estimate', 
    'value', 
    'completeness', 
  ];
  dataSource: MatTableDataSource<ProductBacklogItem>;
  subscription: Subscription;

  constructor(private service: ProductBacklogItemService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<ProductBacklogItem>();
    this.subscription = this.service.subscribe((data: ProductBacklogItem[]) => {
      this.dataSource.data = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
