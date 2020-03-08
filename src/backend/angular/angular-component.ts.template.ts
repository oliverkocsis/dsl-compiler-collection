export const ANGULAR_COMPONENT_TS_TEMPLATE = `import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-{{kebab}}',
  templateUrl: './{{kebab}}.component.html',
  styleUrls: ['./{{kebab}}.component.css']
})
export class {{pascal}}Component implements OnInit {

  formGroup = new FormGroup({
    name: new FormControl(''),
  });

  constructor() { }

  ngOnInit() { }

  onSubmit() { console.info(this.formGroup.value) }

}
`