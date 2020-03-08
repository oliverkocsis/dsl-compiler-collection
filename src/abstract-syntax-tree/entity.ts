import { Node } from './node'

export class Entity implements Node {

    public static readonly TYPE = "Entity";

    constructor(public name: string) { }

    getName(): string {
        return this.name;
    }

    getType(): string {
        return Entity.TYPE;
    }

    appendChild(): void {
        throw new Error("Method not implemented.");
    }

    getChildNodes(): Node[] {
        throw new Error("Method not implemented.");
    }
}