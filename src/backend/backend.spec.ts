import { AbstractSyntaxGraph } from '../abstract-syntax-graph/abstract-syntax-graph';
import { Backend } from './backend';
import { DataNode } from '../abstract-syntax-graph/data-node';
import { readFileSync } from 'fs';
import { Project } from '../project/project';
import { File } from '../project/file';

describe("The Backend", function () {

    let backEnd: Backend;
    let abstractSyntaxTree: AbstractSyntaxGraph;
    let project: Project;

    const DATA_NAME = "Address Form";
    const EXPECTED_DATA_NAME_KEBAB = "address-form";
    const EXPECTED_DATA_NAME_PASCAL = "AddressForm";

    beforeAll(() => {
        backEnd = new Backend();
        abstractSyntaxTree = new AbstractSyntaxGraph();
        abstractSyntaxTree.appendChild(new DataNode(DATA_NAME));
        project = backEnd.generate(abstractSyntaxTree);
    });

    it("generates a readme", function () {
        const file = project.getChildNode('readme.md') as File;
        expect(file).toBeDefined();
        expect(file.getValue().replace(/\s+/g, ' ')).toContain(`$ ng generate @angular/material:address-form ${EXPECTED_DATA_NAME_KEBAB}`);
    });

    it("generates a component class", function () {
        const file = project.getChildNode(`${EXPECTED_DATA_NAME_KEBAB}.component.ts`) as File;
        expect(file).toBeDefined();
        const expected = readFileSync('angular/src/app/address-form/address-form.component.ts');
        expect(file.getValue().replace(/\s+/g, ' ')).toBe(expected.toString().replace(/\s+/g, ' '));
    });

    it("generates a component template", function () {
        const file = project.getChildNode(`${EXPECTED_DATA_NAME_KEBAB}.component.html`) as File;
        expect(file).toBeDefined();
        const expected = readFileSync('angular/src/app/address-form/address-form.component.html');
        expect(file.getValue().replace(/\s+/g, ' ')).toBe(expected.toString().replace(/\s+/g, ' '));
    });

});