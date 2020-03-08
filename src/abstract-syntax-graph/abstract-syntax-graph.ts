import { AbstractSyntaxGraphNode } from "./abstract-syntax-graph-node";

export class AbstractSyntaxGraph extends AbstractSyntaxGraphNode {
    constructor() {
        super("AbstractSyntaxGraph");
    }

    getType(): number {
        return AbstractSyntaxGraphNode.ABSTRACT_SYNTAX_GRAPH_NODE;
    }
}



