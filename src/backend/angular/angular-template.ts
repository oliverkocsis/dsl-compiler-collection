import { readFileSync } from 'fs';

export class AngularTempate {
    private static _componentClassTemplate: string;
    private static _componentHTMLTemplate: string;

    public static getComponentClassTemplate(): string {
        if (!AngularTempate._componentClassTemplate) {
            const buffer = readFileSync('./src/backend/angular/angular-component-class.template');
            if (!AngularTempate._componentClassTemplate) {
                AngularTempate._componentClassTemplate = buffer.toString();
            }
        }
        return AngularTempate._componentClassTemplate;
    }

    public static getComponentHTMLTemplate(): string {
        if (!AngularTempate._componentHTMLTemplate) {
            const buffer = readFileSync('./src/backend/angular/angular-component-html.template');
            if (!AngularTempate._componentHTMLTemplate) {
                AngularTempate._componentHTMLTemplate = buffer.toString();
            }
        }
        return AngularTempate._componentHTMLTemplate;
    }
}