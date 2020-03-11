export const ANGULAR_COMPONENT_HTML_TEMPLATE = `<form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
  <mat-form-field style="margin-right: 1rem;">
    <mat-label>Name</mat-label>
    <input matInput type="text" formControlName="name">
  </mat-form-field>
  <button mat-button color="primary" type="submit">Save</button>
</form>`