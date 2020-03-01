import { Node } from "./node";

export class AbstractSyntaxTree implements Node {

    public static readonly TYPE = "AbstractSyntaxTree";

    private childNodes: Node[];

    constructor() {
        this.childNodes = new Array();
    }

    getName(): string {
        return AbstractSyntaxTree.TYPE;
    }

    getType(): string {
        return AbstractSyntaxTree.TYPE;
    }

    appendChild(node: Node): void {
        this.childNodes.push(node);
    }

    getChildNodes(): Node[] {
        return this.childNodes;
    }
}



