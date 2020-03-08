export abstract class CodeNode {
    public static readonly PROJECT = 0;
    public static readonly DIRECTORY = 1;
    public static readonly FILE = 2;

    private name: string;
    private childNodes: any;

    constructor(name: string) {
        this.name = name;
        this.childNodes = {};
    }

    public getName(): string {
        return this.name;
    }

    public appendChild(node: CodeNode): void {
        this.childNodes[node.getName()] = node;
    }

    getChildNode(name: string): CodeNode {
        return this.childNodes[name];
    }

    getChildNodes(): CodeNode[] {
        const childNodes: CodeNode[] = [];
        for (const key in this.childNodes) {
            if (this.childNodes.hasOwnProperty(key)) {
                childNodes.push(this.childNodes[key]);
            }
        }
        return childNodes;
    }

    public abstract getType(): number;

}