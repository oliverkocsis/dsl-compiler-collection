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