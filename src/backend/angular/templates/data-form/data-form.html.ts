export const DATA_FORM_HTML_TEMPLATE = `<form [formGroup]="formGroup" novalidate (ngSubmit)="onSubmit()">
<mat-card>
  <mat-card-header>
    <mat-card-title>{{name}}</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    {{#properties}}
    <div class="row">
      <div class="col">
        <mat-form-field class="full-width">
          <input matInput placeholder="{{name}}" type="{{htmlType}}" formControlName="{{camel}}">
        </mat-form-field>
      </div>
    </div>
    {{/properties}}
  </mat-card-content>
  <mat-card-actions>
    <button mat-flat-button color="primary" type="submit">Submit</button>
  </mat-card-actions>
</mat-card>
</form>
`