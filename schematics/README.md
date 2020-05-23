Angular Schematics for DSL Compiler Collection

# Getting Started

If you are new to Angular or getting started with a new Angular application, see [Angular's full Getting Started Guide](https://angular.io/start) and [Setting up your environment](https://angular.io/guide/setup-local).

The generate schematics require Angular Material, see [Getting Started with Angular Material](https://material.angular.io/guide/getting-started).

## Install Schematics

Install Angular Schematics for DSL Compiler Collection

```
npm install --save-dev @dsl-cc/schematics
```

## Component schematics

Running the `form` schematic generates a new Angular component using a Material Design form group consisting of:
- Material Design form fields
- Material Design radio controls
- Material Design buttons

```
ng generate @dsl-cc/schematics:form <component-name>
```

# Contributing 

## Product Backlog

Visit our [Product Backlog](https://github.com/oliverkocsis/dsl-compiler-collection/projects/1) and choose an item. 

## Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

## Publishing

To publish, simply do:

```bash
npm run build
npm publish
```
