import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-tab',
  templateUrl: './account-tab.component.html',
  styleUrls: ['./account-tab.component.scss']
})
export class AccountTabComponent implements OnInit {


  form: FormGroup;

  constructor(private route: ActivatedRoute, private service: AccountService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(`router.params: ${JSON.stringify(params)}`);
      const id = params.id;
      this.form = this.service.edit(id);
    });

  }

}
