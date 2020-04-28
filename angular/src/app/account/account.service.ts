import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Account } from './account';
import { DataService } from 'src/_dslcc/data-service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends DataService<Account> { }