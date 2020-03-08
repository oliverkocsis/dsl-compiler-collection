import { CodeNode } from "./code-node";

export class Project extends CodeNode {

    getType(): number {
        return CodeNode.PROJECT;
    }

}