import { AbstractSyntaxGraph } from "../abstract-syntax-graph/abstract-syntax-graph";
import { VirtualFileSystem } from "../virtual-file-system/virtual-file-system";

export interface Frontend {
    parse(root: VirtualFileSystem): AbstractSyntaxGraph;
} 