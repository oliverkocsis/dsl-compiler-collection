export const README_TEMPLATE = `# Getting Started with DSL Compiler Collection

sources:
- https://angular.io/guide/setup-local
- https://material.angular.io/guide/getting-started
- https://angular.io/guide/reactive-forms
- https://material.angular.io/guide/schematics

steps:
1. Install the Angular CLI
1. Create a workspace and initial application
1. Install Angular Material
1. Create a component
1. Create a service
1. Generate form
1. Generate table
1. Copy and paste the files below

scripts:

    $ npm install -g @angular/cli    
    $ ng new my-app --interactive=false --routing=true --style=scss
    $ cd my-app
    $ ng add @angular/material --defaults
    $ ng generate component {{pascal}}
    $ cd ./src/app/{{kebab}} 
    $ ng generate service {{pascal}}
    $ ng generate class {{pascal}}
    $ ng generate @angular/material:address-form {{pascal}}Form
    $ ng generate @angular/material:table {{pascal}}Table

`