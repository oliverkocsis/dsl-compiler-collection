export const ANGULAR_COMPONENT_TS_TEMPLATE = `import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-{{kebab}}-form',
  templateUrl: './{{kebab}}-form.component.html',
  styleUrls: ['./{{kebab}}-form.component.scss']
})
export class {{pascal}}FormComponent {
  formGroup = this.fb.group({
    {{for}}
    company: null,
    firstName: null,
    lastName: null,
    address: null,
    city: null,
    postalCode: null,
    {{end}}
  });

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    console.log(this.formGroup.value);
  }
}
`