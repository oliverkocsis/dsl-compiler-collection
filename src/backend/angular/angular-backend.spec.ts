import { AbstractSyntaxGraph, DataNode, PropertyNode } from '../../abstract-syntax-graph/abstract-syntax-graph';
import { AngularBackend } from './angluar-backend';
import { readFileSync } from 'fs';
import { VirtualFileSystem, Directory, VirtualFileSystemEntry } from '../../virtual-file-system/virtual-file-system';
import { File } from '../../virtual-file-system/virtual-file-system';
import { Backend } from '../backend';

describe("The AngularBackend", function () {

    let backend: Backend;
    let abstractSyntaxTree: AbstractSyntaxGraph;
    let data: DataNode;
    let virtualFileSystem: VirtualFileSystem;
    let folder: Directory;

    const NAME = "Shipping Information";
    const KEBAB = "shipping-information";
    const PASCAL = "ShippingInformation";

    beforeAll(() => {
        backend = new AngularBackend();
        abstractSyntaxTree = new AbstractSyntaxGraph();
        data = new DataNode(NAME);
        data.appendChildNode(new PropertyNode("Company", PropertyNode.TYPE_TEXT));
        data.appendChildNode(new PropertyNode("First Name", PropertyNode.TYPE_TEXT));
        data.appendChildNode(new PropertyNode("Last Name", PropertyNode.TYPE_TEXT));
        data.appendChildNode(new PropertyNode("Address", PropertyNode.TYPE_TEXT));
        data.appendChildNode(new PropertyNode("City", PropertyNode.TYPE_TEXT));
        data.appendChildNode(new PropertyNode("Postal Code", PropertyNode.TYPE_NUMBER));
        abstractSyntaxTree.appendChildNode(data);
        virtualFileSystem = backend.generate(abstractSyntaxTree);
        folder = virtualFileSystem.getChildNode("src").getChildNode("app").getChildNode(KEBAB);
    });


    it("generates a readme markup file", function () {
        const file = virtualFileSystem.getChildNode('readme.md') as File;
        expect(file).toBeDefined();
        expect(file.getValue()).toContain(`$ ng generate component ${PASCAL}`);
        expect(file.getValue()).toContain(`$ cd ./src/app/${KEBAB}`);
        expect(file.getValue()).toContain(`$ ng generate class ${PASCAL}`);
        expect(file.getValue()).toContain(`$ ng generate service ${PASCAL}`);
        expect(file.getValue()).toContain(`$ ng generate @angular/material:address-form ${PASCAL}Form`);
        expect(file.getValue()).toContain(`$ ng generate @angular/material:table ${PASCAL}Table`);
    });

    it("generates a src and app directory", function () {
        expect(folder.getType()).toBe(VirtualFileSystemEntry.DIRECTORY);
    });

    it("generates a class file", function () {
        const file = folder.getChildNode(`${KEBAB}.ts`) as File;
        expect(file).toBeDefined();
        const expected = readFileSync('angular/src/app/shipping-information/shipping-information.ts');
        expect(file.getValue().replace(/\s+/g, ' ')).toBe(expected.toString().replace(/\s+/g, ' '));
    });

    it("generates a service file", function () {
        const file = folder.getChildNode(`${KEBAB}.service.ts`) as File;
        expect(file).toBeDefined();
        const expected = readFileSync('angular/src/app/shipping-information/shipping-information.service.ts');
        expect(file.getValue().replace(/\s+/g, ' ')).toBe(expected.toString().replace(/\s+/g, ' '));
    });

    it("generates a form component HTML file", function () {
        const file = folder.getChildNode(`${KEBAB}-form`).getChildNode(`${KEBAB}-form.component.html`) as File;
        expect(file).toBeDefined();
        const expected = readFileSync('angular/src/app/shipping-information/shipping-information-form/shipping-information-form.component.html');
        expect(file.getValue().replace(/\s+/g, ' ')).toBe(expected.toString().replace(/\s+/g, ' '));
    });

    it("generates a form component SCSS file", function () {
        const file = folder.getChildNode(`${KEBAB}-form`).getChildNode(`${KEBAB}-form.component.scss`) as File;
        expect(file).toBeDefined();
        const expected = readFileSync('angular/src/app/shipping-information/shipping-information-form/shipping-information-form.component.scss');
        expect(file.getValue().replace(/\s+/g, ' ')).toBe(expected.toString().replace(/\s+/g, ' '));
    });

    it("generates a form component TS file", function () {
        const file = folder.getChildNode(`${KEBAB}-form`).getChildNode(`${KEBAB}-form.component.ts`) as File;
        expect(file).toBeDefined();
        const expected = readFileSync('angular/src/app/shipping-information/shipping-information-form/shipping-information-form.component.ts');
        expect(file.getValue().replace(/\s+/g, ' ')).toBe(expected.toString().replace(/\s+/g, ' '));
    });

    it("generates a table component HTML file", function () {
        const file = folder.getChildNode(`${KEBAB}-table`).getChildNode(`${KEBAB}-table.component.html`) as File;
        expect(file).toBeDefined();
        const expected = readFileSync('angular/src/app/shipping-information/shipping-information-table/shipping-information-table.component.html');
        expect(file.getValue().replace(/\s+/g, ' ')).toBe(expected.toString().replace(/\s+/g, ' '));
    });

    it("generates a table component SCSS file", function () {
        const file = folder.getChildNode(`${KEBAB}-table`).getChildNode(`${KEBAB}-table.component.scss`) as File;
        expect(file).toBeDefined();
        const expected = readFileSync('angular/src/app/shipping-information/shipping-information-table/shipping-information-table.component.scss');
        expect(file.getValue().replace(/\s+/g, ' ')).toBe(expected.toString().replace(/\s+/g, ' '));
    });

    it("generates a table component TS file", function () {
        const file = folder.getChildNode(`${KEBAB}-table`).getChildNode(`${KEBAB}-table.component.ts`) as File;
        expect(file).toBeDefined();
        const expected = readFileSync('angular/src/app/shipping-information/shipping-information-table/shipping-information-table.component.ts');
        expect(file.getValue().replace(/\s+/g, ' ')).toBe(expected.toString().replace(/\s+/g, ' '));
    });

});