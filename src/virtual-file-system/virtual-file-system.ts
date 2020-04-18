export abstract class VirtualFileSystemNode {
    public static readonly ROOT = 0;
    public static readonly DIRECTORY = 1;
    public static readonly FILE = 2;

    private name: string;
    protected path: string;
    private childNodes: any;


    constructor(name: string) {
        this.name = name;
        this.path = '/';
        this.childNodes = {};
    }

    public getName(): string {
        return this.name;
    }

    public getPath(): string {
        return this.path;
    }

    public getPathName(): string {
        return this.path + this.name;
    }

    public appendChild(node: VirtualFileSystemNode): void {
        this.childNodes[node.getName()] = node;
        node.path = this.path + this.name + '/'
    }

    getChildNode(name: string): VirtualFileSystemNode {
        return this.childNodes[name];
    }

    getChildNodes(): VirtualFileSystemNode[] {
        const childNodes: VirtualFileSystemNode[] = [];
        for (const key in this.childNodes) {
            if (this.childNodes.hasOwnProperty(key)) {
                childNodes.push(this.childNodes[key]);
            }
        }
        return childNodes;
    }

    getNode(path: string): VirtualFileSystemNode {
        const index = path.indexOf('/');
        switch (index) {
            case -1:
                return this.getChildNode(path);
            case 0:
                return this.getNode(path.substring(1));
            default:
                const curr = path.substring(0, index);
                const next = path.substring(index + 1);
                return this.getChildNode(curr).getNode(next);
        }
    }

    public visit(visitor: (node: VirtualFileSystemNode) => void) {
        VirtualFileSystemNode._visit(visitor, this);
    }

    private static _visit(visitor: (node: VirtualFileSystemNode) => void, _this: VirtualFileSystemNode) {
        visitor(_this);
        for (const n of _this.getChildNodes()) {
            VirtualFileSystemNode._visit(visitor, n);
        }
    }

    public abstract getType(): number;

}

export class VirtualFileSystem extends VirtualFileSystemNode {

    constructor() {
        super('');
        this.path = '';
    }

    getType(): number {
        return VirtualFileSystemNode.ROOT;
    }

}

export class Directory extends VirtualFileSystemNode {

    getType(): number {
        return VirtualFileSystemNode.DIRECTORY;
    }

}

export class File extends VirtualFileSystemNode {

    private value: string;

    constructor(name: string, value: string) {
        super(name);
        this.value = value;
    }

    getType(): number {
        return VirtualFileSystemNode.FILE;
    }

    getValue(): string {
        return this.value;
    }

}