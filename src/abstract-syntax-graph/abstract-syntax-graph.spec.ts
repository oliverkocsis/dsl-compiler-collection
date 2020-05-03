import { AbstractSyntaxGraph, DataNode, AbstractSyntaxGraphNode } from './abstract-syntax-graph';

describe("AbstractSyntaxGraph", function () {

    let abstractSyntaxGraph: AbstractSyntaxGraph;

    beforeEach(() => {
        abstractSyntaxGraph = new AbstractSyntaxGraph();
    });

    it("is empty by default", function () {
        expect(abstractSyntaxGraph.getChildNodes().length).toBe(0);
    });

    it("can contain two data with unique names", function () {
        const firstData = "First Data"
        const secondData = "Second Data"
        abstractSyntaxGraph.appendChildNode(new DataNode(firstData))
        expect(abstractSyntaxGraph.getChildNodes().length).toBe(1);
        abstractSyntaxGraph.appendChildNode(new DataNode(secondData))
        expect(abstractSyntaxGraph.getChildNodes().length).toBe(2);
        const indexFirstData = abstractSyntaxGraph.getChildNodes().map(x => x.getName()).indexOf(firstData);
        const indexSecondData = abstractSyntaxGraph.getChildNodes().map(x => x.getName()).indexOf(secondData);
        expect(indexFirstData).toBeGreaterThan(-1);
        expect(indexSecondData).toBeGreaterThan(-1);
        expect(indexFirstData).not.toBe(indexSecondData);
    });

    it("can not contain two data with the same name", function () {
        const firstData = "Data"
        const secondData = "Data"
        abstractSyntaxGraph.appendChildNode(new DataNode(firstData))
        expect(abstractSyntaxGraph.getChildNodes().length).toBe(1);
        expect(() => { abstractSyntaxGraph.appendChildNode(new DataNode(secondData)) }).toThrowError();
    });

    it("can visit depth-first search from top to bottom", function () {
        const A = new DataNode("A").appendChildNode(new DataNode("B")).appendChildNode(new DataNode("C"));
        const D = new DataNode("D").appendChildNode(new DataNode("E")).appendChildNode(new DataNode("F"));
        abstractSyntaxGraph.appendChildNode(A).appendChildNode(D);
        let actual = "";
        abstractSyntaxGraph.visit((node: AbstractSyntaxGraph) => {
            if (node.getNodeType() != AbstractSyntaxGraphNode.ABSTRACT_SYNTAX_GRAPH) {
                actual += node.getName();
            }
            return true;
        });
        expect(actual).toBe("ABCDEF");
    });

    it("can visit depth-first search from bottom to top", function () {
        const A = new DataNode("A").appendChildNode(new DataNode("B")).appendChildNode(new DataNode("C"));
        const D = new DataNode("D").appendChildNode(new DataNode("E")).appendChildNode(new DataNode("F"));
        abstractSyntaxGraph.appendChildNode(A).appendChildNode(D);
        let actual = "";
        abstractSyntaxGraph.visit((node: AbstractSyntaxGraph) => {
            if (node.getNodeType() != AbstractSyntaxGraphNode.ABSTRACT_SYNTAX_GRAPH) {
                actual += node.getName();
            }
            return true;
        }, false);
        expect(actual).toBe("BCAEFD");
    });

    it("can stop the visit depth-first search from top to bottom", function () {
        const A = new DataNode("A").appendChildNode(new DataNode("B")).appendChildNode(new DataNode("C"));
        const D = new DataNode("D").appendChildNode(new DataNode("E")).appendChildNode(new DataNode("F"));
        abstractSyntaxGraph.appendChildNode(A).appendChildNode(D);
        let actual = "";
        abstractSyntaxGraph.visit((node: AbstractSyntaxGraph) => {
            if (node.getNodeType() != AbstractSyntaxGraphNode.ABSTRACT_SYNTAX_GRAPH) {
                actual += node.getName();
                return false;
            }
            return true;
        });
        expect(actual).toBe("AD");
    });
});