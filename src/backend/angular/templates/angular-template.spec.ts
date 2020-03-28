import { AngularTempate } from './angular-template'

describe("AngularTempate", function () {

  it("returns readme", function () {
    const template = AngularTempate.getReadmeTemplate();
    expect(template.substring(0, 30)).toBe('# Getting Started with Angular');
  });

  it("returns class template", function () {
    const template = AngularTempate.getClassTemplate();
    expect(template.substring(0, 12)).toBe('export class');
  });

  it("returns service template", function () {
    const template = AngularTempate.getServiceTemplate();
    expect(template.substring(0, 21)).toBe('import { Injectable }');
  });

  it("returns form component TS template", function () {
    const template = AngularTempate.getFormComponentTSTemplate();
    expect(template.substring(0, 20)).toBe('import { Component }');
  });

  it("returns form component HTML template", function () {
    const template = AngularTempate.getFormComponentHTMLTemplate();
    expect(template.substring(0, 65)).toBe('<form [formGroup]="formGroup" novalidate (ngSubmit)="onSubmit()">');
  });

  it("returns form component SCSS template", function () {
    const template = AngularTempate.getFormComponentSCSSTemplate();
    expect(template.substring(0, 6)).toBe('.full-');
  });

});