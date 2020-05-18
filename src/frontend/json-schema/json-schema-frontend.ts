import { Frontend } from "../frontend";
import { VirtualFileSystem, File, VirtualFileSystemNode } from "../../virtual-file-system/virtual-file-system";
import { Domain} from "../../domain/domain";
import { startCase } from 'lodash'

export class JsonSchemaFronted implements Frontend {

    public static readonly TYPE_STRING = "string";
    public static readonly TYPE_NUMBER = "number";
    public static readonly TYPE_OBJECT = "object";

    private directory: string;

    constructor(directory: string = "json-schema") {
        this.directory = directory;
    }

    parse(virtualFileSystem: VirtualFileSystem): Domain {
        const domain = new Domain();
        virtualFileSystem.getChildNode(this.directory).visit((node: VirtualFileSystemNode) => {
            if (node.getType() == VirtualFileSystemNode.FILE) {
                domain.addNode(this.parseFile(node as File));
            }
        });
        return domain;
    }

    private parseFile(file: File): Domain {
        const schema = JSON.parse(file.getValue()) as JSONSchema;
        if (!schema.properties) {
            throw new Error(`A schema file must contain at least one entitiy in 'properties': ${file.getPathName()}`);
        }
        const domain = new Domain();
        let repository = new Map<string, Node>();
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
                    domain.addNode(this.parseObject(key, definition, repository));
                } else if (definition.$ref) {
                    domain.addNode(this.parseReference(key, definition.$ref, repository));
                } else {
                    throw new Error(`Domain property has no 'type' nor '$ref': ${key}`);
                }
            }
        }
        return domain;
    }



    private parseObject(name: string, definition: JSONSchemaObject, repository: Map<string, Node>): DataNode {
        const data = new DataNode(startCase(name));
        if (definition.type != JsonSchemaFronted.TYPE_OBJECT.toString()) {
            throw new Error(`Definition is not an object: ${name} (but ${definition.type})`);
        }
        for (const key in definition.properties) {
            if (definition.properties.hasOwnProperty(key)) {
                const property = definition.properties[key] as JSONSchemaObject;
                if (property.type) {
                    if (property.type == JsonSchemaFronted.TYPE_OBJECT) {
                        data.addNode(this.parseObjectProperty(key, property, repository));
                    } else {
                        data.addNode(this.parseBasicProperty(key, property.type));
                    }
                } else if (property.$ref) {
                    data.addNode(this.parseReferenceProperty(key, property.$ref, repository));
                } else {
                    throw new Error(`Property has no 'type' nor '$ref': ${key}`);
                }
            }
        }
        return data;
    }

    private parseReference(name: string, ref: string, repository: Map<string, Node>): DataNode {
        const reference = repository.get(startCase(ref.replace("#/definitions/", "")));
        if (!reference) {
            throw new Error(`Reference does not exist: ${ref} (in ${name})`);
        }
        const data = new DataNode(startCase(name));
        for (const node of reference.getNodes()) {
            data.addNode(node);
        }
        return data;
    }

    private parseBasicProperty(name: string, type: string, list: boolean = false): Node {
        let dataType: number;
        switch (type) {
            case (JsonSchemaFronted.TYPE_STRING):
                dataType = Attribute.TYPE_STRING;
                break;
            case (JsonSchemaFronted.TYPE_NUMBER):
                dataType = Attribute.TYPE_NUMBER;
                break;
            default:
                throw new Error(`Unknown JSON schema type: ${type}`);
        }
        return new Attribute(startCase(name), dataType, list);
    }

    private parseObjectProperty(name: string, definition: JSONSchemaObject, repository: Map<string, Node>, list: boolean = false): Node {
        const data = this.parseObject(name, definition, repository);
        return new Attribute(startCase(name), Attribute.TYPE_OBJECT, list).addNode(data);
    }

    private parseReferenceProperty(name: string, ref: string, repository: Map<string, Node>, list: boolean = false): Node {
        const data = repository.get(startCase(ref.replace("#/definitions/", "")));
        if (!data) {
            throw new Error(`Reference does not exist: ${ref} (in ${name})`);
        }
        return new Attribute(startCase(name), Attribute.TYPE_OBJECT, list).addNode(data);
    }

}

interface JSONSchema {
    type?: string;
    properties?: any;
    definitions?: any;
}

interface JSONSchemaObject {
    type?: string;
    $ref?: string;
    properties?: any;
}
