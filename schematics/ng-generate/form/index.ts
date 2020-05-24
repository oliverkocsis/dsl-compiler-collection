/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { chain, noop, Rule, Tree } from '@angular-devkit/schematics';
import {
  addModuleImportToModule,
  buildComponent,
  findModuleFromOptions,
} from '@angular/cdk/schematics';
import { Schema } from './schema';
import { startCase } from 'lodash';

/**
 * Scaffolds a new form component.
 * Internally it bootstraps the base component schematic
 */
export default function (options: Schema): Rule {
  options.titleize = startCase;
  return chain([
    buildComponent({ ...options }, {
      template: './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.html.template',
      stylesheet:
        './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.__style__.template',
    }),
    options.skipImport ? noop() : addFormModulesToModule(options)
  ]);
}

/**
 * Adds the required modules to the relative module.
 */
function addFormModulesToModule(options: Schema) {
  return (host: Tree) => {
    const modulePath = findModuleFromOptions(host, options)!;
    addModuleImportToModule(host, modulePath, 'MatInputModule', '@angular/material/input');
    addModuleImportToModule(host, modulePath, 'MatButtonModule', '@angular/material/button');
    addModuleImportToModule(host, modulePath, 'MatSelectModule', '@angular/material/select');
    addModuleImportToModule(host, modulePath, 'MatRadioModule', '@angular/material/radio');
    addModuleImportToModule(host, modulePath, 'MatCardModule', '@angular/material/card');
    addModuleImportToModule(host, modulePath, 'ReactiveFormsModule', '@angular/forms');
    return host;
  };
}