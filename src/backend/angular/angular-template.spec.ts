import { AngularTempate } from './angular-template'

describe("AngularTempate", function () {
  it("returns component class template", function () {
    const template = AngularTempate.getComponentTSTemplate();
    expect(template.substring(0, 6)).toBe('import');
  });

  it("returns component HTML template", function () {
    const template = AngularTempate.getComponentHTMLTemplate();
    expect(template.substring(0, 6)).toBe('<form ');
  });

  it("returns readme", function () {
    const template = AngularTempate.getReadmeTemplate();
    expect(template.substring(0, 6)).toBe('# Impo');
  });
});