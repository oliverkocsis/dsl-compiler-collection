export const ANGULAR_README_TEMPLATE = `# Getting Started with Angular

source: https://angular.io/guide/setup-local

1. Install the Angular CLI
1. Create a workspace and initial application
1. Create component
1. Create service

    $ npm install -g @angular/cli    
    $ ng new my-app --interactive=false --routing=true --style=scss
    $ cd my-app
    $ ng generate component ShippingInformation
    $ cd .\src\app\shipping-information\ 
    $ ng generate service ShippingInformation
    $ ng generate class ShippingInformation



# Getting Started with Angular Material

source: https://material.angular.io/guide/getting-started

1. Install Angular Material

    $ ng add @angular/material --defaults

# Generate Material Design component

source:
- https://angular.io/guide/reactive-forms
- https://material.angular.io/guide/schematics

1. Generate a component with a form group that uses Material Design form controls
1. Copy and paste the files below into the created files

    $ ng generate @angular/material:address-form {{kebab}}

# Generate Table 

    $ ng generate @angular/material:table ShippingInformationTable
`