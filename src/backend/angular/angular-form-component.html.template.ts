export const ANGULAR_COMPONENT_HTML_TEMPLATE = `<form [formGroup]="formGroup" novalidate (ngSubmit)="onSubmit()">
<mat-card class="shipping-card">
  <mat-card-header>
    <mat-card-title>{{name}}</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    {{for}}
    <div class="row">
      <div class="col">
        <mat-form-field class="full-width">
          <input matInput placeholder="Company" formControlName="company">
        </mat-form-field>
      </div>
    </div>
    {{end}}
    <div class="row">
      <div class="col">
        <mat-form-field class="full-width">
          <input matInput placeholder="First name" formControlName="firstName">
        </mat-form-field>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <mat-form-field class="full-width">
          <input matInput placeholder="Last name" formControlName="lastName">
        </mat-form-field>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <mat-form-field class="full-width">
          <input matInput placeholder="Address" formControlName="address">
        </mat-form-field>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <mat-form-field class="full-width">
          <input matInput placeholder="City" formControlName="city">
        </mat-form-field>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <mat-form-field class="full-width">
          <input matInput placeholder="Postal Code" type="number" formControlName="postalCode">
        </mat-form-field>
      </div>
    </div>
  </mat-card-content>
  <mat-card-actions>
    <button mat-flat-button color="primary" type="submit">Submit</button>
  </mat-card-actions>
</mat-card>
</form>`