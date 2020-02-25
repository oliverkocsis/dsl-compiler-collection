export interface Node {
    getName(): string;
    getType(): string;
    appendChild(node: Node): void;
    getChildNodes(): Node[];

}