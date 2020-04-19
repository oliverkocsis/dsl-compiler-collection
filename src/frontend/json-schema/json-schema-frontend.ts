import { Frontend } from "../frontend";
import { VirtualFileSystem, File, VirtualFileSystemNode } from "../../virtual-file-system/virtual-file-system";
import { AbstractSyntaxGraph, DataNode, PropertyNode } from "../../abstract-syntax-graph/abstract-syntax-graph";
import { startCase } from 'lodash'

export class JsonSchemaFronted implements Frontend {
    public static readonly TYPE_STRING = "string";
    public static readonly TYPE_NUMBER = "number";
    public static readonly TYPE_REF = "$ref";
    public static readonly FILE_POSTFIX = ".schema.json";

    parse(virtualFileSystem: VirtualFileSystem): AbstractSyntaxGraph {
        const abstractSyntaxGraph = new AbstractSyntaxGraph();
        virtualFileSystem.visit((node: VirtualFileSystemNode) => {
            switch (node.getType()) {
                case VirtualFileSystemNode.FILE:
                    if (node.getName().endsWith(JsonSchemaFronted.FILE_POSTFIX)) {
                        const file = node as File
                        const schema = JSON.parse(file.getValue())
                        const properties = schema["properties"];
                        const data = new DataNode(startCase(file.getName().replace(JsonSchemaFronted.FILE_POSTFIX, "")));
                        for (const key in properties) {
                            if (properties.hasOwnProperty(key)) {
                                const property = properties[key];
                                const type = JsonSchemaFronted.mapJsonSchemaTypeToDataType(property["type"]);
                                data.appendChildNode(new PropertyNode(startCase(key), type));
                            }
                        }
                        abstractSyntaxGraph.appendChildNode(data);
                    } else {
                        console.warn(`The file is not a JSON schema: ${node.getPathName()}. A JSON schema must end with '.schema.json'.`)
                    }
                    break;
            }
        });
        return abstractSyntaxGraph;
    }

    private static mapJsonSchemaTypeToDataType(type: string): number {
        switch (type) {
            case (JsonSchemaFronted.TYPE_STRING):
                return PropertyNode.TYPE_STRING;
            case (JsonSchemaFronted.TYPE_NUMBER):
                return PropertyNode.TYPE_NUMBER;
            default:
                throw new Error("Unknown JSON schema type: " + type);
        }
    }

}