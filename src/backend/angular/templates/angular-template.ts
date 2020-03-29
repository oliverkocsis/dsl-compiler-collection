import { ANGULAR_README_TEMPLATE } from './angular-readme.template';
import { ANGULAR_CLASS_TEMPLATE } from './anggular-class.template';
import { ANGULAR_SERVICE_TEMPLATE } from './anggular-service.template';
import { ANGULAR_FORM_HTML_TEMPLATE } from './angular-form-component.html.template';
import { ANGULAR_FORM_TS_TEMPLATE } from './angular-form-component.ts.template';
import { ANGULAR_FORM_SCSS_TEMPLATE } from './angular-form-component.scss.template';
import { ANGULAR_TABLE_HTML_TEMPLATE } from './angular-table-component.html.template';
import { ANGULAR_TABLE_TS_TEMPLATE } from './angular-table-component.ts.template';
import { ANGULAR_TABLE_SCSS_TEMPLATE } from './angular-table-component.scss.template';

export class AngularTempate {

  public static getReadmeTemplate(): string {
    return ANGULAR_README_TEMPLATE;
  }

  static getClassTemplate(): string {
    return ANGULAR_CLASS_TEMPLATE;
  }

  static getServiceTemplate(): string {
    return ANGULAR_SERVICE_TEMPLATE;
  }

  public static getFormComponentTSTemplate(): string {
    return ANGULAR_FORM_TS_TEMPLATE;
  }

  public static getFormComponentHTMLTemplate(): string {
    return ANGULAR_FORM_HTML_TEMPLATE;
  }

  public static getFormComponentSCSSTemplate(): string {
    return ANGULAR_FORM_SCSS_TEMPLATE;
  }

  public static getTableComponentTSTemplate(): string {
    return ANGULAR_TABLE_TS_TEMPLATE;
  }

  public static getTableComponentHTMLTemplate(): string {
    return ANGULAR_TABLE_HTML_TEMPLATE;
  }

  public static getTableComponentSCSSTemplate(): string {
    return ANGULAR_TABLE_SCSS_TEMPLATE;
  }

}