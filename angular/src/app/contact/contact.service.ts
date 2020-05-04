import { Injectable } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends DataService<Contact> { }