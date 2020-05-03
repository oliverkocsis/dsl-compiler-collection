import { readFileSync } from 'fs';

export class AngularTempate {

  private static cache = new Map<string, string>();

  public static data_component_html(): string {
    const path = 'src/backend/angular/templates/data/data/data.component.html.mustache';
    return AngularTempate.cacheReadFileSync(path);
  }

  public static data_component_scss(): string {
    const path = 'src/backend/angular/templates/data/data/data.component.scss.mustache';
    return AngularTempate.cacheReadFileSync(path);
  }

  public static data_component_ts(): string {
    const path = 'src/backend/angular/templates/data/data/data.component.ts.mustache';
    return AngularTempate.cacheReadFileSync(path);
  }

  public static data_form_component_html(): string {
    const path = 'src/backend/angular/templates/data/data-form/data-form.component.html.mustache';
    return AngularTempate.cacheReadFileSync(path);
  }

  public static data_form_component_scss(): string {
    const path = 'src/backend/angular/templates/data/data-form/data-form.component.scss.mustache';
    return AngularTempate.cacheReadFileSync(path);
  }

  public static data_form_component_ts(): string {
    const path = 'src/backend/angular/templates/data/data-form/data-form.component.ts.mustache';
    return AngularTempate.cacheReadFileSync(path);
  }

  public static data_list_component_html(): string {
    const path = 'src/backend/angular/templates/data/data-list/data-list.component.html.mustache';
    return AngularTempate.cacheReadFileSync(path);
  }

  public static data_list_component_scss(): string {
    const path = 'src/backend/angular/templates/data/data-list/data-list.component.scss.mustache';
    return AngularTempate.cacheReadFileSync(path);
  }

  public static data_list_component_ts(): string {
    const path = 'src/backend/angular/templates/data/data-list/data-list.component.ts.mustache';
    return AngularTempate.cacheReadFileSync(path);
  }

  public static data_table_component_html(): string {
    const path = 'src/backend/angular/templates/data/data-table/data-table.component.html.mustache';
    return AngularTempate.cacheReadFileSync(path);
  }

  public static data_table_component_scss(): string {
    const path = 'src/backend/angular/templates/data/data-table/data-table.component.scss.mustache';
    return AngularTempate.cacheReadFileSync(path);
  }

  public static data_table_component_ts(): string {
    const path = 'src/backend/angular/templates/data/data-table/data-table.component.ts.mustache';
    return AngularTempate.cacheReadFileSync(path);
  }

  static data_ts(): string {
    const path = 'src/backend/angular/templates/data/data.ts.mustache';
    return AngularTempate.cacheReadFileSync(path);
  }

  static data_service_ts(): string {
    const path = 'src/backend/angular/templates/data/data.service.ts.mustache';
    return AngularTempate.cacheReadFileSync(path);
  }

  public static app_routing_module_ts(): string {
    const path = 'src/backend/angular/templates/app-routing.module.ts.mustache';
    return AngularTempate.cacheReadFileSync(path);
  }

  public static app_component_html(): string {
    const path = 'src/backend/angular/templates/app.component.html.mustache';
    return AngularTempate.cacheReadFileSync(path);
  }

  public static app_component_scss(): string {
    const path = 'src/backend/angular/templates/app.component.scss.mustache';
    return AngularTempate.cacheReadFileSync(path);
  }

  public static app_component_ts(): string {
    const path = 'src/backend/angular/templates/app.component.ts.mustache';
    return AngularTempate.cacheReadFileSync(path);
  }

  public static app_module_ts(): string {
    const path = 'src/backend/angular/templates/app.module.ts.mustache';
    return AngularTempate.cacheReadFileSync(path);
  }

  private static cacheReadFileSync(path: string): string {
    if (!this.cache.has(path)) {
      const file = readFileSync(path).toString();
      this.cache.set(path, file);
    }
    const file = this.cache.get(path);
    if (!file) {
      throw new Error(`File can not be found: ${path}`);
    }
    return file;
  }

  static abstract_data_ts(): string {
    const path = 'src/backend/angular/templates/data.ts.mustache';
    return AngularTempate.cacheReadFileSync(path);
  }

  static abstract_data_service_ts(): string {
    const path = 'src/backend/angular/templates/data.service.ts.mustache';
    return AngularTempate.cacheReadFileSync(path);
  }
}