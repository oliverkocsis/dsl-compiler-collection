import { CodeNode } from "./code-node";

export class File extends CodeNode {

    private value: Buffer;

    constructor(name: string, value: Buffer) {
        super(name);
        this.value = value;
    }

    getType(): number {
        return CodeNode.FILE;
    }

    getValue(): Buffer {
        return this.value;
    }

}