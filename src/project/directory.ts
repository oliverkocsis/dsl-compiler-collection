import { CodeNode } from "./code-node";

export class Directory extends CodeNode {

    getType(): number {
        return CodeNode.DIRECTORY;
    }

}