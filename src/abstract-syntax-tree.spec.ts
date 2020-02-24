import { AbstractSyntaxTree } from './abstract-syntax-tree';

describe("Abstract Syntax Tree", function () {

    let abstractSyntaxTree: AbstractSyntaxTree;

    beforeEach(() => {
        abstractSyntaxTree = new AbstractSyntaxTree();
    });

    it("creates entity", function () {
        let name = "My First Entity"
        let entity = abstractSyntaxTree.createEntity(name);
        expect(entity.name).toBe(name);
    });

    it("persists entity", function () {
        let name = "My First Entity"
        abstractSyntaxTree.createEntity(name);
        let entity = abstractSyntaxTree.getEntity(name);
        expect(entity.name).toBe(name);
    });

    it("persists list of entities", function () {
        let nameFirst = "My First Entity";
        let nameSecond = "My Second Entity"
        abstractSyntaxTree.createEntity(nameFirst);
        abstractSyntaxTree.createEntity(nameSecond);
        let entites = abstractSyntaxTree.getEntities();
        expect(entites.length).toBe(2);
        let entityFirst = abstractSyntaxTree.getEntity(nameFirst);
        expect(entityFirst.name).toBe(nameFirst);
        let entitySecond = abstractSyntaxTree.getEntity(nameSecond);
        expect(entitySecond.name).toBe(nameSecond);
    });
});