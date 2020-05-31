
import { Rule, SchematicContext, Tree, chain, externalSchematic, } from '@angular-devkit/schematics';
import { NodePackageInstallTask, } from '@angular-devkit/schematics/tasks';
import { Schema } from './schema';

// Just return the tree
export default function (options: Schema): Rule {
  return chain([
    externalSchematic('@angular/material', 'ng-add', options),
    (tree: Tree, _context: SchematicContext) => {
      _context.addTask(new NodePackageInstallTask());
      return tree;
    }
  ]);
}