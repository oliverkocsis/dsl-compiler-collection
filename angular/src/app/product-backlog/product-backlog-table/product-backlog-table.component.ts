import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ProductBacklog } from '../product-backlog';
import { ProductBacklogService } from '../product-backlog.service';

@Component({
  selector: 'app-product-backlog-table',
  templateUrl: './product-backlog-table.component.html',
  styleUrls: ['./product-backlog-table.component.scss']
})
export class ProductBacklogTableComponent implements OnInit, OnDestroy {
  displayedColumns = [
    'name', 
  ];
  dataSource: MatTableDataSource<ProductBacklog>;
  subscription: Subscription;

  constructor(private service: ProductBacklogService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<ProductBacklog>();
    this.subscription = this.service.subscribe((data: ProductBacklog[]) => {
      this.dataSource.data = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
