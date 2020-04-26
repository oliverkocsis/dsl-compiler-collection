import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-table',
  templateUrl: './account-table.component.html',
  styleUrls: ['./account-table.component.scss']
})
export class AccountTableComponent implements OnInit {

  displayedColumns = [
    'name',
    'parent',
    'type',
    'phone',
    'website',
  ];
  dataSource: MatTableDataSource<Account>;
  subscription: Subscription;

  constructor(private service: AccountService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Account>();
    this.subscription = this.service.subscribe((data: Account[]) => {
      this.dataSource.data = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
