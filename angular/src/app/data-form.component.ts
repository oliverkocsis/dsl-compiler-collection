import { OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from './data.service';
import { Data } from './data';

export abstract class FormComponent<D extends Data> {
  @Input() id: string;
  public formGroup: FormGroup;
  abstract submit(): D;
}

export abstract class DataFormComponent<D extends Data, S extends DataService<D>> extends FormComponent<D> implements OnInit {

  constructor(protected formBuilder: FormBuilder, protected service: S) {
    super();
  }

  ngOnInit() {
    this.formGroup = this.buildForm();
    if (this.id) {
      const data = this.service.read(this.id)
      if (data) {
        this.formGroup.patchValue(data);
      }
      else {
        const msg = `Data does not exist: ${this.id}`;
        console.warn(msg);
        throw new Error(msg);
      }
    }
  }

  submit(): D {
    const formValue = this.formGroup.value;
    console.log(`formGroup.value: ${JSON.stringify(formValue)}`);
    const data = formValue._id ? this.service.update(formValue) : this.service.create(formValue);
    this.id = data._id;
    this.formGroup.patchValue({ _id: data._id });
    return data;
  }

  abstract buildForm(): FormGroup;
}