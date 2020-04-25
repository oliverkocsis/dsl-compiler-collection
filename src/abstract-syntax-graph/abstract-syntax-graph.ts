export abstract class AbstractSyntaxGraphNode {

    public static readonly ABSTRACT_SYNTAX_GRAPH_NODE = 0;
    public static readonly DATA_NODE = 1;
    public static readonly PROPERTY_NODE = 2;

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

    public visit(visitor: (node: AbstractSyntaxGraphNode) => void) {
        AbstractSyntaxGraphNode._visit(visitor, this);
    }

    private static _visit(visitor: (node: AbstractSyntaxGraphNode) => void, _this: AbstractSyntaxGraphNode) {
        visitor(_this);
        for (const n of _this.getChildNodes()) {
            AbstractSyntaxGraphNode._visit(visitor, n);
        }
    }

    public abstract getNodeType(): number;

}

export class AbstractSyntaxGraph extends AbstractSyntaxGraphNode {

    constructor() {
        super("AbstractSyntaxGraph");
    }

    getNodeType(): number {
        return AbstractSyntaxGraphNode.ABSTRACT_SYNTAX_GRAPH_NODE;
    }
}

export class DataNode extends AbstractSyntaxGraphNode {

    getNodeType(): number {
        return AbstractSyntaxGraphNode.DATA_NODE;
    }

}

export class PropertyNode extends AbstractSyntaxGraphNode {

    public static readonly TYPE_OBJECT = 0;
    public static readonly TYPE_STRING = 1;
    public static readonly TYPE_NUMBER = 2;

    private type: number;

    constructor(name: string, type: number) {
        super(name);
        this.type = type;
    }

    getNodeType(): number {
        return AbstractSyntaxGraphNode.PROPERTY_NODE;
    }

    getType(): number {
        return this.type;
    }

    isList(): any {
        throw new Error("Method not implemented.");
    }

    getChildNode(): AbstractSyntaxGraphNode {
        throw new Error("Method not implemented.");
    }
}