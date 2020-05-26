import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { Schema } from './schema';

// Just return the tree
export default function (options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const angularMaterialTaskId = context.addTask(new RunSchematicTask('@angular/material', 'ng-add', options));
    context.addTask(new NodePackageInstallTask(), [angularMaterialTaskId]);
    return tree;
  };
}