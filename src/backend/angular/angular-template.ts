import { ANGULAR_COMPONENT_HTML_TEMPLATE } from './angular-component.html.template';
import { ANGULAR_COMPONENT_TS_TEMPLATE } from './angular-component.ts.template';
import { ANGULAR_README_TEMPLATE } from './angular-readme.template'

export class AngularTempate {

  public static getComponentTSTemplate(): string {
    return ANGULAR_COMPONENT_TS_TEMPLATE;
  }

  public static getComponentHTMLTemplate(): string {
    return ANGULAR_COMPONENT_HTML_TEMPLATE;
  }

  public static getReadmeTemplate(): string {
    return ANGULAR_README_TEMPLATE;
  }
}