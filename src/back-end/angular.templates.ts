export const COMPONENT_CLASS = `import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-{{kebab}}',
  templateUrl: './{{kebab}}.component.html',
  styleUrls: ['./{{kebab}}.component.css']
})
export class {{pascal}}Component implements OnInit {

  {{camel}}Group = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
  });

  constructor() { }

  ngOnInit() {
  }

}
`

export const COMPONENT_HTML = `<form [formGroup]="{{camel}}Group">
    <label>
        Name:
        <input type="text" formControlName="name">
    </label>
</form>`