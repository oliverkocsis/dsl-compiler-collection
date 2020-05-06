import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private route: ActivatedRoute, private location: Location, private service: AccountService) { }

  ngOnInit() {

  }

  save() {
    this.service.save();
  }

  saveClose() {
    this.service.save();
    this.location.back();
  }

}