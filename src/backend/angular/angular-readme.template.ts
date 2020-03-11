export const ANGULAR_README_TEMPLATE = `# Import Reactive Form module
1. Import the Reactive Form module in your app (i.e. app.module.ts)

    import { ReactiveFormsModule } from '@angular/forms';
    ...
    imports: [
        ...
        ReactiveFormsModule,
        ...
    ],

# Getting Started with Angular Material
1. Go to [Getting Started with Angular Material](https://material.angular.io/guide/getting-started)
1. Follow the instruction and install Angular Material

# Import Angular Material modules
1. Import the Angular Material modules in your app (i.e. app.module.ts)

    import { MatInputModule } from '@angular/material/input';
    import { MatButtonModule } from '@angular/material/button';
    ...
    imports: [
        ...
        MatInputModule,
        MatButtonModule,
        ...
    ],

# Create Component
1. Create a new folder called {{kebab}}
1. Create a new file called {{kebab}}.component.ts in the {{kebab}} folder
1. Create a new file called {{kebab}}.component.html in the {{kebab}} folder
1. Copy and paste the files below into the created files

# Declare Component
1. Declare the new component in your app (i.e. app.module.ts)

    import { {{pascal}}Component } from './{{kebab}}/{{kebab}}.component';
    ...
    declarations: [
        ...
        {{pascal}}Component
        ...
    ],
`