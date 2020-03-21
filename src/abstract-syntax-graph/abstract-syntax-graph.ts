export abstract class AbstractSyntaxGraphNode {

    public static readonly ABSTRACT_SYNTAX_GRAPH_NODE = 0;
    public static readonly DATA_NODE = 1;

    private name: string;
    private childNodes: any;

    constructor(name: string) {
        this.name = name;
        this.childNodes = {};
    }

    public getName(): string {
        return this.name;
    }

    public appendChildNode(node: AbstractSyntaxGraphNode): void {
        if (this.childNodes[node.getName()] != undefined) {
            throw new Error(`Child node exist: ${node.getName()}`);
        }
        this.childNodes[node.getName()] = node;
    }

    public setChildNode(node: AbstractSyntaxGraphNode): void {
        this.childNodes[node.getName()] = node;
    }

    public getChildNode(name: string): AbstractSyntaxGraphNode {
        return this.childNodes[name];
    }

    public getChildNodes(): AbstractSyntaxGraphNode[] {
        const childNodes: AbstractSyntaxGraphNode[] = [];
        for (const key in this.childNodes) {
            if (this.childNodes.hasOwnProperty(key)) {
                childNodes.push(this.childNodes[key]);
            }
        }
        return childNodes;
    }

    public abstract getType(): number;

}

export class AbstractSyntaxGraph extends AbstractSyntaxGraphNode {

    constructor() {
        super("AbstractSyntaxGraph");
    }

    getType(): number {
        return AbstractSyntaxGraphNode.ABSTRACT_SYNTAX_GRAPH_NODE;
    }
}

export class DataNode extends AbstractSyntaxGraphNode {

    getType(): number {
        return AbstractSyntaxGraphNode.DATA_NODE;
    }

}