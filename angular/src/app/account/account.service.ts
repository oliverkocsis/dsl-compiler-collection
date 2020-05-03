import { Injectable } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends DataService<Account> { }