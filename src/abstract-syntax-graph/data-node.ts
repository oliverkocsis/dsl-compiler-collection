import { AbstractSyntaxGraphNode } from "./abstract-syntax-graph-node";

export class DataNode extends AbstractSyntaxGraphNode {

    getType(): number {
        return AbstractSyntaxGraphNode.DATA_NODE;
    }
    
}