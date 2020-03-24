export abstract class VirtualFileSystemEntry {
    public static readonly VIRTUAL_FILE_SYSTEM = 0;
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

    public appendChild(node: VirtualFileSystemEntry): void {
        this.childNodes[node.getName()] = node;
    }

    getChildNode(name: string): VirtualFileSystemEntry {
        return this.childNodes[name];
    }

    getChildNodes(): VirtualFileSystemEntry[] {
        const childNodes: VirtualFileSystemEntry[] = [];
        for (const key in this.childNodes) {
            if (this.childNodes.hasOwnProperty(key)) {
                childNodes.push(this.childNodes[key]);
            }
        }
        return childNodes;
    }

    public abstract getType(): number;

}

export class VirtualFileSystem extends VirtualFileSystemEntry {

    constructor() {
        super("VirtualFileSystem");
    }

    getType(): number {
        return VirtualFileSystemEntry.VIRTUAL_FILE_SYSTEM;
    }

}

export class Directory extends VirtualFileSystemEntry {

    getType(): number {
        return VirtualFileSystemEntry.DIRECTORY;
    }

}

export class File extends VirtualFileSystemEntry {

    private value: string;

    constructor(name: string, value: string) {
        super(name);
        this.value = value;
    }

    getType(): number {
        return VirtualFileSystemEntry.FILE;
    }

    getValue(): string {
        return this.value;
    }

}