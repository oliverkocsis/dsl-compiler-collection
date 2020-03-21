import { AbstractSyntaxGraph } from './abstract-syntax-graph';
import { DataNode } from './data-node';

describe("Abstract Syntax Tree", function () {

    let abstractSyntaxTree: AbstractSyntaxGraph;

    beforeEach(() => {
        abstractSyntaxTree = new AbstractSyntaxGraph();
    });

    it("is empty by default", function () {
        expect(abstractSyntaxTree.getChildNodes().length).toBe(0);
    });

    it("can contain at least one or more entities", function () {
        const first_entity = "First Data"
        const second_entity = "Second Data"
        abstractSyntaxTree.appendChild(new DataNode(first_entity))
        expect(abstractSyntaxTree.getChildNodes().length).toBe(1);
        abstractSyntaxTree.appendChild(new DataNode(second_entity))
        expect(abstractSyntaxTree.getChildNodes().length).toBe(2);
        const index_of_first_entity = abstractSyntaxTree.getChildNodes().map(x => x.getName()).indexOf(first_entity);
        const index_of_second_entity = abstractSyntaxTree.getChildNodes().map(x => x.getName()).indexOf(second_entity);
        expect(index_of_first_entity).toBeGreaterThan(-1);
        expect(index_of_second_entity).toBeGreaterThan(-1);
        expect(index_of_first_entity).not.toBe(index_of_second_entity);
    });
});