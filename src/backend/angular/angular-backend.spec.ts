import { AbstractSyntaxGraph, DataNode, PropertyNode } from '../../abstract-syntax-graph/abstract-syntax-graph';
import { AngularBackend } from './angluar-backend';
import { readFileSync } from 'fs';
import { VirtualFileSystem } from '../../virtual-file-system/virtual-file-system';
import { File } from '../../virtual-file-system/virtual-file-system';
import { Backend } from '../backend';

describe("The AngularBackend", function () {

    let backend: Backend;
    let abstractSyntaxTree: AbstractSyntaxGraph;
    let data: DataNode;
    let virtualFileSystem: VirtualFileSystem;

    const DATA_NAME = "Shipping Information";
    const DATA_NAME_KEBAB = "shipping-information";

    beforeAll(() => {
        backend = new AngularBackend();
        abstractSyntaxTree = new AbstractSyntaxGraph();
        data = new DataNode(DATA_NAME);
        data.appendChildNode(new PropertyNode("Company", PropertyNode.TYPE_TEXT));
        data.appendChildNode(new PropertyNode("First Name", PropertyNode.TYPE_TEXT));
        data.appendChildNode(new PropertyNode("Last Name", PropertyNode.TYPE_TEXT));
        data.appendChildNode(new PropertyNode("Address", PropertyNode.TYPE_TEXT));
        data.appendChildNode(new PropertyNode("City", PropertyNode.TYPE_TEXT));
        data.appendChildNode(new PropertyNode("Postal Code", PropertyNode.TYPE_NUMBER));
        abstractSyntaxTree.appendChildNode(data);
        virtualFileSystem = backend.generate(abstractSyntaxTree);
    });

    it("generates a readme", function () {
        const file = virtualFileSystem.getChildNode('readme.md') as File;
        expect(file).toBeDefined();
        expect(file.getValue().replace(/\s+/g, ' ')).toContain(`$ ng generate @angular/material:address-form ${DATA_NAME_KEBAB}`);
    });

    it("generates a form component HTML", function () {
        const file = virtualFileSystem.getChildNode(`${DATA_NAME_KEBAB}-form.component.html`) as File;
        expect(file).toBeDefined();
        const expected = readFileSync('angular/src/app/shipping-information/shipping-information-form/shipping-information-form.component.html');
        expect(file.getValue().replace(/\s+/g, ' ')).toBe(expected.toString().replace(/\s+/g, ' '));
    });

    it("generates a form component CSCC", function () {
        const file = virtualFileSystem.getChildNode(`${DATA_NAME_KEBAB}-form.component.scss`) as File;
        expect(file).toBeDefined();
        const expected = readFileSync('angular/src/app/shipping-information/shipping-information-form/shipping-information-form.component.scss');
        expect(file.getValue().replace(/\s+/g, ' ')).toBe(expected.toString().replace(/\s+/g, ' '));
    });

    it("generates a form component TS", function () {
        const file = virtualFileSystem.getChildNode(`${DATA_NAME_KEBAB}-form.component.ts`) as File;
        expect(file).toBeDefined();
        const expected = readFileSync('angular/src/app/shipping-information/shipping-information-form/shipping-information-form.component.ts');
        expect(file.getValue().replace(/\s+/g, ' ')).toBe(expected.toString().replace(/\s+/g, ' '));
    });

});