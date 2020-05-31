/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

/** Gets the content of a specified file from a schematic tree. */
export function getFileContent(tree: Tree, filePath: string): string {
  const contentBuffer = tree.read(filePath);

  if (!contentBuffer) {
    throw new Error(`Cannot read "${filePath}" because it does not exist.`);
  }

  return contentBuffer.toString();
}

/** Create a base app used for testing. */
export async function createTestApp(runner: SchematicTestRunner, appOptions = {}, tree?: Tree): Promise<UnitTestTree> {
  return createTestProject(runner, 'application', appOptions, tree);
}

/** Create a base project used for testing. */
export async function createTestProject(runner: SchematicTestRunner, projectType: 'application' | 'library', appOptions = {}, tree?: Tree): Promise<UnitTestTree> {
  const workspaceTree = await runner.runExternalSchematicAsync('@schematics/angular', 'workspace', {
    name: 'workspace',
    version: '6.0.0',
    newProjectRoot: 'projects',
  }, tree).toPromise();

  return runner.runExternalSchematicAsync('@schematics/angular', projectType, appOptions, workspaceTree).toPromise();
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


/**
 * Sorts the keys of the given object.
 * @returns A new object instance with sorted keys
 */
function sortObjectByKeys(obj: object) {
  return Object.keys(obj).sort().reduce((result: any, key: any) => (result[key] = obj[key]) && result, {});
}

/** Adds a package to the package.json in the given host tree. */
export function addPackageToPackageJson(host: Tree, pkg: string, version: string): Tree {

  if (host.exists('package.json')) {
    const sourceText = host.read('package.json')!.toString('utf-8');
    const json = JSON.parse(sourceText);

    if (!json.dependencies) {
      json.dependencies = {};
    }

    if (!json.dependencies[pkg]) {
      json.dependencies[pkg] = version;
      json.dependencies = sortObjectByKeys(json.dependencies);
    }

    host.overwrite('package.json', JSON.stringify(json, null, 2));
  }

  return host;
}

/** Gets the version of the specified package by looking at the package.json in the given tree. */
export function getPackageVersionFromPackageJson(tree: Tree, name: string): string | null {
  if (!tree.exists('package.json')) {
    return null;
  }

  const packageJson = JSON.parse(tree.read('package.json')!.toString('utf8'));

  if (packageJson.dependencies && packageJson.dependencies[name]) {
    return packageJson.dependencies[name];
  }

  return null;
}