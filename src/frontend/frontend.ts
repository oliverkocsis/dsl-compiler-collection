import { AbstractSyntaxGraph } from "../abstract-syntax-graph/abstract-syntax-graph";
import { Root } from "../virtual-file-system/virtual-file-system";

export interface Frontend {
    parse(root: Root): AbstractSyntaxGraph;
} 