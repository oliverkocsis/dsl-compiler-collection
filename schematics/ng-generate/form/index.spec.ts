/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createTestApp, getFileContent } from '../../util/test-util';
import { Schema } from './schema';
import { join } from 'path';

const collectionPath = join(process.cwd(), 'collection.json');

describe('ng generate @dsl-cc/schematics:form', () => {
  let runner: SchematicTestRunner;
  const schematic = 'form'
  const name = 'shipping-address';
  const fields: string[] = ["street", "city", "postal-code"];
  const project = 'dsl-cc';

  const baseOptions: Schema = {
    name: name,
    fields: fields,
    project: project,
  };

  beforeEach(() => {
    runner = new SchematicTestRunner('schematics', collectionPath);
  });

  it('should create form files and add them to module', async () => {
    const app = await createTestApp(runner, { name: project });
    const tree = await runner.runSchematicAsync(schematic, baseOptions, app).toPromise();
    const files = tree.files;

    expect(files).toContain(`/projects/${project}/src/app/${name}/${name}.component.css`);
    expect(files).toContain(`/projects/${project}/src/app/${name}/${name}.component.html`);
    expect(files).toContain(`/projects/${project}/src/app/${name}/${name}.component.spec.ts`);
    expect(files).toContain(`/projects/${project}/src/app/${name}/${name}.component.ts`);

    const moduleContent = getFileContent(tree, `/projects/${project}/src/app/app.module.ts`);
    expect(moduleContent).toMatch(/import.*ShippingAddress.*from '.\/shipping-address\/shipping-address.component'/);
    expect(moduleContent).toMatch(/declarations:\s*\[[^\]]+?,\r?\n\s+ShippingAddressComponent\r?\n/m);
  });

  it('should add form imports to module', async () => {
    const app = await createTestApp(runner, { name: project });
    const tree = await runner.runSchematicAsync(schematic, baseOptions, app).toPromise();
    const moduleContent = getFileContent(tree, `/projects/${project}/src/app/app.module.ts`);

    expect(moduleContent).toContain('MatInputModule');
    expect(moduleContent).toContain('MatButtonModule');
    expect(moduleContent).toContain('MatSelectModule');
    expect(moduleContent).toContain('MatRadioModule');
    expect(moduleContent).toContain('ReactiveFormsModule');
  });

  it('should add fields to the template form', async () => {
    const app = await createTestApp(runner, { name: project });
    const tree = await runner.runSchematicAsync(schematic, baseOptions, app).toPromise();
    const content = getFileContent(tree, `/projects/${project}/src/app/${name}/${name}.component.html`);

    expect(content).toMatch(/<mat-card-title>.*Shipping Address.*<\/mat-card-title>/);
    expect(content).toMatch(/<input.*matInput.*placeholder.*=.*"Street".*formControlName.*=.*"street".*>/);
    expect(content).toMatch(/<input.*matInput.*placeholder.*=.*"City".*formControlName.*=.*"city".*>/);
    expect(content).toMatch(/<input.*matInput.*placeholder.*=.*"Postal Code".*formControlName.*=.*"postalCode".*>/);
  });

  it('should add fields to the component form', async () => {
    const app = await createTestApp(runner, { name: project });
    const tree = await runner.runSchematicAsync(schematic, baseOptions, app).toPromise();
    const content = getFileContent(tree, `/projects/${project}/src/app/${name}/${name}.component.ts`);

    expect(content).toMatch(/form = this.fb.group\({[\s]*street.*:.*null.*,[\s]*city.*:.*null.*,[\s]*postalCode.*:.*null.*,[\s]*}\);/);
  });


  it('should throw if no name has been specified', async () => {
    const app = await createTestApp(runner, { name: project });
    await expectAsync(runner.runSchematicAsync(schematic, { project: project }, app).toPromise()).toBeRejectedWithError(/required property 'name'/);
  });

  it('should throw if no fields has been specified', async () => {
    const app = await createTestApp(runner, { name: project });
    await expectAsync(runner.runSchematicAsync(schematic, { project: project, name: name }, app).toPromise()).toBeRejectedWithError(/required property 'fields'/);
  });


  describe('style option', () => {
    it('should respect the option value', async () => {
      const app = await createTestApp(runner, { name: project });
      const tree = await runner.runSchematicAsync(schematic, { style: 'scss', ...baseOptions }, app).toPromise();

      expect(tree.files).toContain(`/projects/${project}/src/app/${name}/${name}.component.scss`);
    });

    it('should fall back to the @schematics/angular:component option value', async () => {
      const app = await createTestApp(runner, { name: project, style: 'less' });
      const tree = await runner.runSchematicAsync(schematic, baseOptions, app).toPromise();

      expect(tree.files).toContain(`/projects/${project}/src/app/${name}/${name}.component.less`);
    });
  });

  describe('inlineStyle option', () => {
    it('should respect the option value', async () => {
      const app = await createTestApp(runner, { name: project });
      const tree = await runner.runSchematicAsync(schematic, { inlineStyle: true, ...baseOptions }, app).toPromise();

      expect(tree.files).not.toContain(`/projects/${project}/src/app/${name}/${name}.component.css`);
      expect(tree.readContent(`/projects/${project}/src/app/${name}/${name}.component.ts`)).toContain('styles: [`');
    });

    it('should fall back to the @schematics/angular:component option value', async () => {
      const app = await createTestApp(runner, { name: project, inlineStyle: true });
      const tree = await runner.runSchematicAsync(schematic, baseOptions, app).toPromise();

      expect(tree.files).not.toContain(`/projects/${project}/src/app/${name}/${name}.component.css`);
    });
  });

  describe('inlineTemplate option', () => {
    it('should respect the option value', async () => {
      const app = await createTestApp(runner, { name: project });
      const tree = await runner.runSchematicAsync(schematic, { inlineTemplate: true, ...baseOptions }, app).toPromise();

      expect(tree.files).not.toContain(`/projects/${project}/src/app/${name}/${name}.component.html`);
      expect(tree.readContent(`/projects/${project}/src/app/${name}/${name}.component.ts`)).toContain('template: `');
    });

    it('should fall back to the @schematics/angular:component option value', async () => {
      const app = await createTestApp(runner, { name: project, inlineTemplate: true });
      const tree = await runner.runSchematicAsync(schematic, baseOptions, app).toPromise();

      expect(tree.files).not.toContain(`/projects/${project}/src/app/${name}/${name}.component.html`);
    });
  });

  describe('skipTests option', () => {
    it('should respect the option value', async () => {
      const app = await createTestApp(runner, { name: project });
      const tree = await runner.runSchematicAsync(schematic, { skipTests: true, ...baseOptions }, app).toPromise();

      expect(tree.files).not.toContain(`/projects/${project}/src/app/${name}/${name}.component.spec.ts`);
    });

    it('should fall back to the @schematics/angular:component option value', async () => {
      const app = await createTestApp(runner, { name: project, skipTests: true });
      const tree = await runner.runSchematicAsync(schematic, baseOptions, app).toPromise();

      expect(tree.files).not.toContain(`/projects/${project}/src/app/${name}/${name}.component.spec.ts`);
    });
  });
});
