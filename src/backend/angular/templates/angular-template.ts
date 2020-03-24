import { ANGULAR_README_TEMPLATE } from './angular-readme.template'
import { ANGULAR_COMPONENT_HTML_TEMPLATE } from './angular-form-component.html.template';
import { ANGULAR_COMPONENT_TS_TEMPLATE } from './angular-form-component.ts.template';
import { ANGULAR_COMPONENT_SCSS_TEMPLATE } from './angular-form-component.scss.template';

export class AngularTempate {

  public static getReadmeTemplate(): string {
    return ANGULAR_README_TEMPLATE;
  }

  public static getFormComponentTSTemplate(): string {
    return ANGULAR_COMPONENT_TS_TEMPLATE;
  }

  public static getFormComponentHTMLTemplate(): string {
    return ANGULAR_COMPONENT_HTML_TEMPLATE;
  }

  public static getFormComponentSCSSTemplate(): string {
    return ANGULAR_COMPONENT_SCSS_TEMPLATE;
  }

}