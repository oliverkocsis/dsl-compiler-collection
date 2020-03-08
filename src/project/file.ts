import { CodeNode } from "./code-node";

export class File extends CodeNode {

    private value: string;

    constructor(name: string, value: string) {
        super(name);
        this.value = value;
    }

    getType(): number {
        return CodeNode.FILE;
    }

    getValue(): string {
        return this.value;
    }

}