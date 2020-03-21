import { AngularTempate } from './angular-template'

describe("AngularTempate", function () {

  it("returns readme", function () {
    const template = AngularTempate.getReadmeTemplate();
    expect(template.substring(0, 6)).toBe('# Gett');
  });

  it("returns form component TS template", function () {
    const template = AngularTempate.getFormComponentTSTemplate();
    expect(template.substring(0, 6)).toBe('import');
  });

  it("returns form component HTML template", function () {
    const template = AngularTempate.getFormComponentHTMLTemplate();
    expect(template.substring(0, 6)).toBe('<form ');
  });

  it("returns form component SCSS template", function () {
    const template = AngularTempate.getFormComponentSCSSTemplate();
    expect(template.substring(0, 6)).toBe('.full-');
  });

});