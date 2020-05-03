export abstract class AbstractSyntaxGraphNode {

    public static readonly ABSTRACT_SYNTAX_GRAPH = 0;
    public static readonly DOAMIN_NODE = 1;
    public static readonly DATA_NODE = 2;
    public static readonly PROPERTY_NODE = 3;

    private name: string;
    private childNodes: any;

    constructor(name: string) {
        this.name = name;
        this.childNodes = {};
    }

    public getName(): string {
        return this.name;
    }

    /**
     * Adds a node to this node. 
     * @param node Returns this node to be able to chain the call
     */
    public appendChildNode(node: AbstractSyntaxGraphNode): AbstractSyntaxGraphNode {
        if (this.childNodes[node.getName()] != undefined) {
            throw new Error(`Child node exist: ${node.getName()}`);
        }
        this.childNodes[node.getName()] = node;
        return this;
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

    /**
     * Depth-first search
     * @param visitor when false then stops the search on that branch
     * @param top If true then visits the elements from top-to-bottom, otherwise bottom-to-top
     */
    public visit(visitor: (node: AbstractSyntaxGraphNode) => boolean, top = true) {
        if (top) {
            if (!visitor(this)) {
                return
            };
        }
        for (const n of this.getChildNodes()) {
            n.visit(visitor, top);
        }
        if (!top) {
            if (!visitor(this)) {
                return
            };
        }
    }

    public abstract getNodeType(): number;

}

export class AbstractSyntaxGraph extends AbstractSyntaxGraphNode {

    constructor() {
        super("AbstractSyntaxGraph");
    }

    getNodeType(): number {
        return AbstractSyntaxGraphNode.ABSTRACT_SYNTAX_GRAPH;
    }
}

export class DomainNode extends AbstractSyntaxGraphNode {

    getNodeType(): number {
        return AbstractSyntaxGraphNode.DOAMIN_NODE;
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
    private list: boolean;
    private child: string;

    constructor(name: string, type: number, list: boolean = false) {
        super(name);
        this.type = type;
        this.list = list;
        this.child = "";
    }

    getNodeType(): number {
        return AbstractSyntaxGraphNode.PROPERTY_NODE;
    }

    getType(): number {
        return this.type;
    }

    isList(): any {
        return this.list;
    }

    public getChildNode(): AbstractSyntaxGraphNode {
        return super.getChildNode(this.child);
    }

    public appendChildNode(node: AbstractSyntaxGraphNode): AbstractSyntaxGraphNode {
        this.child = node.getName();
        return super.appendChildNode(node);
    }

}