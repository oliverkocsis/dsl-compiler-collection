import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressFormComponent } from '../address-form/address-form.component';
import { Address } from '../address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @ViewChild('form') form: AddressFormComponent;
  id: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  data(data: Address) {
  }

  submit() {
    this.form.submit();
    this.router.navigate(['/address-list']);
  }
  
}