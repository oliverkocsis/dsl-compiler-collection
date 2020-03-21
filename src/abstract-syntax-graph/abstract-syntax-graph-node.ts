export abstract class AbstractSyntaxGraphNode {

    public static readonly ABSTRACT_SYNTAX_GRAPH_NODE = 0;
    public static readonly DATA_NODE = 1;

    private name: string;
    private childNodes: AbstractSyntaxGraphNode[];

    constructor(name: string) {
        this.name = name;
        this.childNodes = new Array();
    }

    public getName(): string {
        return this.name;
    }

    public appendChild(node: AbstractSyntaxGraphNode): void {
        this.childNodes.push(node);
    }

    public getChildNodes(): AbstractSyntaxGraphNode[] {
        return this.childNodes.map(node => node);
    }

    public abstract getType(): number;

}
