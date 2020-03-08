export const ANGULAR_COMPONENT_HTML_TEMPLATE = `<form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
    <label>
        Name:
        <input type="text" formControlName="name">
    </label>
    <input type="submit">
</form>`