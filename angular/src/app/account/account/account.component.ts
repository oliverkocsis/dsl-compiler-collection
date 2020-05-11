import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AccountService } from '../account.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  form: FormGroup;

  constructor(private route: ActivatedRoute, private location: Location, private service: AccountService) { }

  ngOnInit() {
    this.service.subscribeForm((form: FormGroup) => this.form = form)
  }

  save() {
    this.service.onSave();
  }

  saveClose() {
    this.service.onSave();
    this.location.back();
  }

}