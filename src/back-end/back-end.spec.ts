import { BackEnd } from './back-end';
import { AbstractSyntaxTree } from '../abstract-syntax-tree/abstract-syntax-tree';
import { Entity } from '../abstract-syntax-tree/entity';
import { SourceCode } from './source-code';
import { readFileSync } from 'fs'

describe("The BackEnd", function () {

    let backEnd: BackEnd;
    let abstractSyntaxTree: AbstractSyntaxTree;
    let sourceCode: SourceCode[];

    const entity_name = "My Domain"
    const entity_name_kebab = "my-domain"
    const entity_name_camel = "MyDomain"

    beforeAll(() => {
        backEnd = new BackEnd();
        abstractSyntaxTree = new AbstractSyntaxTree();
        abstractSyntaxTree.appendChild(new Entity(entity_name));
        sourceCode = backEnd.generate(abstractSyntaxTree);
    });

    it("generates a component class and a component template", function () {
        expect(sourceCode.length).toBe(2);
    });

    it("the name of the component class is <entity-name>.component.ts", function () {
        let index = sourceCode.map(x => x.name).indexOf(`${entity_name_kebab}.component.ts`);
        expect(index).toBeGreaterThan(-1);
    });

    it("the name of the component template is <entity-name>.component.html", function () {
        let index = sourceCode.map(x => x.name).indexOf(`${entity_name_kebab}.component.html`);
        expect(index).toBeGreaterThan(-1);
    });


    it("the content of the component class is a valid angular form class", function () {
        let index = sourceCode.map(x => x.name).indexOf(`${entity_name_kebab}.component.ts`);
        expect(sourceCode[index].data.toString()).toBe(entity_component_class);
    });

    it("the content of the component template is a valid angular form template", function () {
        let index = sourceCode.map(x => x.name).indexOf(`${entity_name_kebab}.component.html`);
        expect(sourceCode[index].data.toString()).toBe(entity_component_template);
    });


});

const entity_component_class = `import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-domain',
  templateUrl: './my-domain.component.html'
})
export class MyDomainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
`

const entity_component_template = `<p>my-domain works!</p>
`