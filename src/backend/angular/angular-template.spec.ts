import { AngularTempate } from './angular-template'

describe("AngularTempate", function () {
    it("returns component class template", function () {
        const template = AngularTempate.getComponentClassTemplate();
        expect(template.substring(0, 6)).toBe('import');
    });

    it("returns component HTML template", function () {
        const template = AngularTempate.getComponentHTMLTemplate();
        expect(template.substring(0, 6)).toBe('<form ');
    });
});