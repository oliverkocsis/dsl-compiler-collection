import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-table',
  templateUrl: './account-table.component.html',
  styleUrls: ['./account-table.component.scss']
})
export class AccountTableComponent implements OnInit, OnDestroy {

  displayedColumns = [
    'name',
    'phone',
    'website',
  ];
  dataSource: MatTableDataSource<Account>;
  subscription: Subscription;

  constructor(private router: Router, private service: AccountService) { }

  ngOnInit() {
    this.service.onList();
    this.dataSource = new MatTableDataSource<Account>();
    this.subscription = this.service.subscribeStore((data: Account[]) => {
      this.dataSource.data = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  edit(id: string) {
    this.router.navigate(['/account/edit', id])
  }

}