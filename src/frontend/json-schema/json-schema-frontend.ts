import { Frontend } from "../frontend";
import { VirtualFileSystem, File, VirtualFileSystemNode } from "../../virtual-file-system/virtual-file-system";
import { AbstractSyntaxGraph, DataNode, PropertyNode, DomainNode, AbstractSyntaxGraphNode } from "../../abstract-syntax-graph/abstract-syntax-graph";
import { startCase } from 'lodash'

export class JsonSchemaFronted implements Frontend {

    public static readonly TYPE_STRING = "string";
    public static readonly TYPE_NUMBER = "number";
    public static readonly TYPE_OBJECT = "object";

    private directory: string;

    constructor(directory: string = "json-schema") {
        this.directory = directory;
    }

    parse(virtualFileSystem: VirtualFileSystem): AbstractSyntaxGraph {
        const abstractSyntaxGraph = new AbstractSyntaxGraph();
        virtualFileSystem.getChildNode(this.directory).visit((node: VirtualFileSystemNode) => {
            if (node.getType() == VirtualFileSystemNode.FILE) {
                abstractSyntaxGraph.appendChildNode(this.parseFile(node as File));
            }
        });
        return abstractSyntaxGraph;
    }

    private parseFile(file: File): DomainNode {
        const schema = JSON.parse(file.getValue()) as JSONSchema;
        if (!schema.title || !schema.properties) {
            throw new Error(`The JSON schema shall contain both 'title' and 'properties': ${file.getPathName()}`);
        }
        const domain = new DomainNode(schema.title);
        let repository = new Map<string, AbstractSyntaxGraphNode>();
        if (schema.definitions) {
            for (const key in schema.definitions) {
                if (schema.definitions.hasOwnProperty(key)) {
                    const definition = schema.definitions[key] as JSONSchemaObject;
                    repository.set(startCase(key), this.parseObject(key, definition, repository));
                }
            }
        }
        for (const key in schema.properties) {
            if (schema.properties.hasOwnProperty(key)) {
                const definition = schema.properties[key] as JSONSchemaObject;
                if (definition.type) {
                    domain.appendChildNode(this.parseObject(key, definition, repository));
                } else if (definition.$ref) {
                    domain.appendChildNode(this.parseReference(key, definition.$ref, repository));
                } else {
                    throw new Error(`Domain property has no 'type' nor '$ref': ${key}`);
                }
            }
        }
        return domain;
    }



    private parseObject(name: string, definition: JSONSchemaObject, repository: Map<string, AbstractSyntaxGraphNode>): DataNode {
        const data = new DataNode(startCase(name));
        if (definition.type != JsonSchemaFronted.TYPE_OBJECT.toString()) {
            throw new Error(`Definition is not an object: ${name} (but ${definition.type})`);
        }
        for (const key in definition.properties) {
            if (definition.properties.hasOwnProperty(key)) {
                const property = definition.properties[key] as JSONSchemaObject;
                if (property.type) {
                    if (property.type == JsonSchemaFronted.TYPE_OBJECT) {
                        data.appendChildNode(this.parseObjectProperty(key, property, repository));
                    } else {
                        data.appendChildNode(this.parseBasicProperty(key, property.type));
                    }
                } else if (property.$ref) {
                    data.appendChildNode(this.parseReferenceProperty(key, property.$ref, repository));
                } else {
                    throw new Error(`Property has no 'type' nor '$ref': ${key}`);
                }
            }
        }
        return data;
    }

    private parseReference(name: string, ref: string, repository: Map<string, AbstractSyntaxGraphNode>): DataNode {
        const data = repository.get(startCase(ref.replace("#/definitions/", "")));
        if (!data) {
            throw new Error(`Reference does not exist: ${ref} (in ${name})`);
        }
        return data;
    }

    private parseBasicProperty(name: string, type: string, list: boolean = false): AbstractSyntaxGraphNode {
        let dataType: number;
        switch (type) {
            case (JsonSchemaFronted.TYPE_STRING):
                dataType = PropertyNode.TYPE_STRING;
                break;
            case (JsonSchemaFronted.TYPE_NUMBER):
                dataType = PropertyNode.TYPE_NUMBER;
                break;
            default:
                throw new Error(`Unknown JSON schema type: ${type}`);
        }
        return new PropertyNode(startCase(name), dataType, list);
    }

    private parseObjectProperty(name: string, definition: JSONSchemaObject, repository: Map<string, AbstractSyntaxGraphNode>, list: boolean = false): AbstractSyntaxGraphNode {
        const data = this.parseObject(name, definition, repository);
        return new PropertyNode(startCase(name), PropertyNode.TYPE_OBJECT, list).appendChildNode(data);
    }

    private parseReferenceProperty(name: string, ref: string, repository: Map<string, AbstractSyntaxGraphNode>, list: boolean = false): AbstractSyntaxGraphNode {
        const data = repository.get(startCase(ref.replace("#/definitions/", "")));
        if (!data) {
            throw new Error(`Reference does not exist: ${ref} (in ${name})`);
        }
        return new PropertyNode(startCase(name), PropertyNode.TYPE_OBJECT, list).appendChildNode(data);
    }

}

interface JSONSchema {
    title?: string;
    type?: string;
    properties?: any;
    definitions?: any;
}

interface JSONSchemaObject {
    type?: string;
    $ref?: string;
    properties?: any;
}
