import { AbstractSyntaxGraphNode } from "./abstract-syntax-graph-node";

export class Entity extends AbstractSyntaxGraphNode {

    getType(): number {
        return AbstractSyntaxGraphNode.ENITY_NODE;
    }
    
}