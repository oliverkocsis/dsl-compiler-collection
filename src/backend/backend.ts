import { AbstractSyntaxGraph } from "../abstract-syntax-graph/abstract-syntax-graph";
import { Root } from "../virtual-file-system/virtual-file-system";

export interface Backend {
    generate(abstractSyntaxGraph: AbstractSyntaxGraph): Root;
} 