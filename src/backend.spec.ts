import { AngularBackend } from './backend';
import { AbstractSyntaxTree } from './abstract-syntax-tree';

describe("Angular Backend", function () {

    let backend = new AngularBackend();
    let abstractSyntaxTree = new AbstractSyntaxTree();

    abstractSyntaxTree.createEntity("My First Entity");
    abstractSyntaxTree.createEntity("My Second Entity");

    it("generates a component class and a component template per entity", function () {
        const files = backend.generate(abstractSyntaxTree)
        expect(files.length).toBe(4);
    });
});