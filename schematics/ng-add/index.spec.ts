/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createTestApp, getFileContent } from '../util/test-util';
import { join } from 'path';
import { Schema } from './schema';

const collectionPath = join(process.cwd(), 'collection.json');

describe('ng add @dsl-cc/schematics', () => {
  let runner: SchematicTestRunner;
  let appTree: Tree;
  const project = 'dsl-cc';

  const baseOptions: Schema = {
    project: project,
    theme: 'indigo-pink',
    typography: true,
    animations: true
  };

  beforeEach(async () => {
    runner = new SchematicTestRunner('schematics', collectionPath);
    appTree = await createTestApp(runner, { name: project, ...baseOptions });
  });


  it('should update package.json', async () => {
    const tree = await runner.runSchematicAsync('ng-add', {}, appTree).toPromise();
    const packageJson = JSON.parse(getFileContent(tree, '/package.json'));
    const dependencies = packageJson.dependencies;
    const angularCoreVersion = dependencies['@angular/core'];

    expect(dependencies['@angular/material']).toBe('~0.0.0-PLACEHOLDER');
    expect(dependencies['@angular/cdk']).toBe('~0.0.0-PLACEHOLDER');
    expect(dependencies['@angular/forms']).toBe(angularCoreVersion, 'Expected the @angular/forms package to have the same version as @angular/core.');
    expect(dependencies['@angular/animations']).toBe(angularCoreVersion, 'Expected the @angular/animations package to have the same version as @angular/core.');
    expect(Object.keys(dependencies)).toEqual(Object.keys(dependencies).sort(), 'Expected the modified "dependencies" to be sorted alphabetically.');
    expect(runner.tasks.some(task => task.name === 'node-package')).toBe(true, 'Expected the package manager to be scheduled in order to update lock files.');
    expect(runner.tasks.some(task => task.name === 'run-schematic')).toBe(true, 'Expected the setup-project schematic to be scheduled.');
  });

});
