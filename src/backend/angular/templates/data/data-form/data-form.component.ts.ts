export const DATA_FORM_TS_TEMPLATE = `import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { {{pascal}}Service } from '../{{kebab}}.service';
import { {{pascal}} } from '../{{kebab}}';

@Component({
  selector: 'app-{{kebab}}-form',
  templateUrl: './{{kebab}}-form.component.html',
  styleUrls: ['./{{kebab}}-form.component.scss']
})
export class {{pascal}}FormComponent {
  formGroup = this.fb.group({
    {{#properties}}
    {{camel}}: null,
    {{/properties}}
  });

  constructor(private fb: FormBuilder, private service: {{pascal}}Service) { }

  onSubmit() {
    console.log(this.formGroup.value);
    const {{camel}} = {{pascal}}.from(this.formGroup.value);
    this.service.create({{camel}});
    this.formGroup.reset();
  }
}
`