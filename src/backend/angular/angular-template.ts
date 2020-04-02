import { README_TEMPLATE } from './templates/readme';
import { DATA_CLASS_TEMPLATE } from './templates/data-class';
import { DATA_SERVICE_TEMPLATE } from './templates/data-service';
import { DATA_FORM_HTML_TEMPLATE } from './templates/data-form/data-form.html';
import { DATA_FORM_SCSS_TEMPLATE } from './templates/data-form/data-form.scss';
import { DATA_FORM_TS_TEMPLATE } from './templates/data-form/data-form.ts';
import { DATA_TABLE_HTML_TEMPLATE } from './templates/data-table/data-table.html';
import { DATA_TABLE_SCSS_TEMPLATE } from './templates/data-table/data-table.scss';
import { DATA_TABLE_TS_TEMPLATE } from './templates/data-table/data-table.ts';
import { DATA_COMPONENT_HTML_TEMPLATE } from './templates/data-component.html';
import { DATA_COMPONENT_SCSS_TEMPLATE } from './templates/data-component.scss';
import { DATA_COMPONENT_TS_TEMPLATE } from './templates/data-component.ts';
import { ROUTING_TEMPLATE } from './templates/routing';

export class AngularTempate {

  public static getReadmeTemplate(): string {
    return README_TEMPLATE;
  }

  static getClassTemplate(): string {
    return DATA_CLASS_TEMPLATE;
  }

  static getServiceTemplate(): string {
    return DATA_SERVICE_TEMPLATE;
  }

  public static getFormComponentHTMLTemplate(): string {
    return DATA_FORM_HTML_TEMPLATE;
  }

  public static getFormComponentSCSSTemplate(): string {
    return DATA_FORM_SCSS_TEMPLATE;
  }

  public static getFormComponentTSTemplate(): string {
    return DATA_FORM_TS_TEMPLATE;
  }

  public static getTableComponentHTMLTemplate(): string {
    return DATA_TABLE_HTML_TEMPLATE;
  }

  public static getTableComponentSCSSTemplate(): string {
    return DATA_TABLE_SCSS_TEMPLATE;
  }

  public static getTableComponentTSTemplate(): string {
    return DATA_TABLE_TS_TEMPLATE;
  }

  public static getComponentHTMLTemplate(): string {
    return DATA_COMPONENT_HTML_TEMPLATE;
  }

  public static getComponentSCSSTemplate(): string {
    return DATA_COMPONENT_SCSS_TEMPLATE;
  }

  public static getComponentTSTemplate(): string {
    return DATA_COMPONENT_TS_TEMPLATE;
  }

  public static getRoutingTemplate(): string {
    return ROUTING_TEMPLATE;
  }

}