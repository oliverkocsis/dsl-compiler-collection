import { Frontend } from "../frontend";
import { VirtualFileSystem } from "../../virtual-file-system/virtual-file-system";
import { AbstractSyntaxGraph } from "../../abstract-syntax-graph/abstract-syntax-graph";

export class JsonSchemaFronted implements Frontend {

    parse(root: VirtualFileSystem): AbstractSyntaxGraph {
        throw new Error("Method not implemented.");
    }

}