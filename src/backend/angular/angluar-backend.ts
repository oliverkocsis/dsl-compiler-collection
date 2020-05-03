import * as Mustache from 'mustache';
import { AngularTempate } from "./angular-template";
import { AbstractSyntaxGraph, DataNode, PropertyNode, AbstractSyntaxGraphNode } from '../../abstract-syntax-graph/abstract-syntax-graph';
import { VirtualFileSystem, Directory, VirtualFileSystemNode } from '../../virtual-file-system/virtual-file-system';
import { File } from '../../virtual-file-system/virtual-file-system';
import { Backend } from '../backend';
import * as _ from 'lodash';

const _pascalCase = _.flow(_.camelCase, _.upperFirst);

export class AngularBackend implements Backend {

    constructor() { }

    public generate(abstractSyntaxGraph: AbstractSyntaxGraph): VirtualFileSystem {
        const virtualFileSystem = new VirtualFileSystem();
        const src = new Directory('src');
        virtualFileSystem.appendChild(src);
        const app = new Directory('app');
        src.appendChild(app);

        const dataNodes: DataNode[] = [];
        abstractSyntaxGraph.visit((node: AbstractSyntaxGraphNode) => {
            switch (node.getNodeType()) {
                case AbstractSyntaxGraphNode.DATA_NODE:
                    const dataNode = node as DataNode;
                    this.generateData(dataNode, app);
                    dataNodes.push(dataNode)
            }
            return true;
        });

        const topDataNodes: DataNode[] = [];
        abstractSyntaxGraph.visit((node: AbstractSyntaxGraphNode) => {
            switch (node.getNodeType()) {
                case AbstractSyntaxGraphNode.DATA_NODE:
                    const dataNode = node as DataNode;
                    this.generateData(dataNode, app);
                    topDataNodes.push(dataNode)
                    return false;
            }
            return true;
        });

        this.generateApp(app, dataNodes, topDataNodes);

        this.generateUtil(app);

        return virtualFileSystem;
    }

    public generateData(node: DataNode, parent: VirtualFileSystemNode): Directory {
        let name;
        let data;
        const view = this.generateDataView(node);
        const directory = new Directory(view.kebab);
        parent.appendChild(directory);
        name = `${view.kebab}.ts`;
        data = Mustache.render(AngularTempate.data_ts(), view);
        directory.appendChild(new File(name, data));
        name = `${view.kebab}.service.ts`;
        data = Mustache.render(AngularTempate.data_service_ts(), view);
        directory.appendChild(new File(name, data));
        this.generateDataComponent(node, directory, view);
        this.generateDataForm(node, directory, view);
        this.generateDataList(node, directory, view);
        this.generateDataTable(node, directory, view);
        return directory;
    }

    public generateDataComponent(node: DataNode, parent: VirtualFileSystemNode, view: DataView): VirtualFileSystemNode {
        let name;
        let data;
        const directory = new Directory(`${view.kebab}`);
        parent.appendChild(directory);
        name = `${view.kebab}.component.html`;
        data = Mustache.render(AngularTempate.data_component_html(), view);
        directory.appendChild(new File(name, data));
        name = `${view.kebab}.component.scss`;
        data = Mustache.render(AngularTempate.data_component_scss(), view);
        directory.appendChild(new File(name, data));
        name = `${view.kebab}.component.ts`;
        data = Mustache.render(AngularTempate.data_component_ts(), view);
        directory.appendChild(new File(name, data));
        return parent;
    }

    public generateDataForm(node: DataNode, parent: VirtualFileSystemNode, view: DataView): VirtualFileSystemNode {
        let name;
        let data;
        const directory = new Directory(`${view.kebab}-form`);
        parent.appendChild(directory);
        name = `${view.kebab}-form.component.html`;
        data = Mustache.render(AngularTempate.data_form_component_html(), view);
        directory.appendChild(new File(name, data));
        name = `${view.kebab}-form.component.scss`;
        data = Mustache.render(AngularTempate.data_form_component_scss(), view);
        directory.appendChild(new File(name, data));
        name = `${view.kebab}-form.component.ts`;
        data = Mustache.render(AngularTempate.data_form_component_ts(), view);
        directory.appendChild(new File(name, data));
        return directory;
    }

    public generateDataList(node: DataNode, parent: VirtualFileSystemNode, view: DataView): VirtualFileSystemNode {
        let name;
        let data;
        const directory = new Directory(`${view.kebab}-list`);
        parent.appendChild(directory);
        name = `${view.kebab}-list.component.html`;
        data = Mustache.render(AngularTempate.data_list_component_html(), view);
        directory.appendChild(new File(name, data));
        name = `${view.kebab}-list.component.scss`;
        data = Mustache.render(AngularTempate.data_list_component_scss(), view);
        directory.appendChild(new File(name, data));
        name = `${view.kebab}-list.component.ts`;
        data = Mustache.render(AngularTempate.data_list_component_ts(), view);
        directory.appendChild(new File(name, data));
        return directory;
    }

    public generateDataTable(node: DataNode, parent: VirtualFileSystemNode, view: DataView): VirtualFileSystemNode {
        let name;
        let data;
        const directory = new Directory(`${view.kebab}-table`);
        parent.appendChild(directory);
        name = `${view.kebab}-table.component.html`;
        data = Mustache.render(AngularTempate.data_table_component_html(), view);
        directory.appendChild(new File(name, data));
        name = `${view.kebab}-table.component.scss`;
        data = Mustache.render(AngularTempate.data_table_component_scss(), view);
        directory.appendChild(new File(name, data));
        name = `${view.kebab}-table.component.ts`;
        data = Mustache.render(AngularTempate.data_table_component_ts(), view);
        directory.appendChild(new File(name, data));
        return directory;
    }

    public generateApp(dir: Directory, dataNodes: DataNode[], topDataNodes: DataNode[]) {
        let name;
        let data;
        let view = {
            dataNodes: dataNodes.map((value: DataNode) => this.generateDataView(value))
        }
        let topView = {
            dataNodes: topDataNodes.map((value: DataNode) => this.generateDataView(value))
        }
        name = `app-routing.module.ts`;
        data = Mustache.render(AngularTempate.app_routing_module_ts(), view);
        dir.appendChild(new File(name, data));
        name = `app.component.html`;
        data = Mustache.render(AngularTempate.app_component_html(), topView);
        dir.appendChild(new File(name, data));
        name = `app.component.scss`;
        data = Mustache.render(AngularTempate.app_component_scss(), view);
        dir.appendChild(new File(name, data));
        name = `app.component.ts`;
        data = Mustache.render(AngularTempate.app_component_ts(), view);
        dir.appendChild(new File(name, data));
        name = `app.module.ts`;
        data = Mustache.render(AngularTempate.app_module_ts(), view);
        dir.appendChild(new File(name, data));
    }

    generateUtil(dir: Directory) {
        let name;
        name = `data.service.ts`;
        dir.appendChild(new File(name, AngularTempate.abstract_data_service_ts()));
        name = `data.ts`;
        dir.appendChild(new File(name, AngularTempate.abstract_data_ts()));
    }

    public generateDataView(node: DataNode): DataView {
        const kebab = _.kebabCase(node.getName());
        const camel = _.camelCase(node.getName());
        const pascal = _pascalCase(node.getName());

        const properties: PropertyView[] = [];
        const objects: ObjectView[] = [];

        for (const childNode of node.getChildNodes()) {
            if (childNode.getNodeType() != AbstractSyntaxGraphNode.PROPERTY_NODE) {
                throw new Error(`DataNode should have only PropertyNode child nodes: ${node.getName()}`);
            }
            const propertyNode = childNode as PropertyNode;

            if (propertyNode.getType() == PropertyNode.TYPE_OBJECT) {
                const object: ObjectView = {
                    name: node.getName(),
                    kebab: _.kebabCase(propertyNode.getChildNode().getName()),
                    camel: _.camelCase(propertyNode.getChildNode().getName()),
                    pascal: _pascalCase(propertyNode.getChildNode().getName()),
                    property: {
                        name: propertyNode.getName(),
                        kebab: _.kebabCase(propertyNode.getName()),
                        camel: _.camelCase(propertyNode.getName()),
                        pascal: _pascalCase(propertyNode.getName()),
                    }
                };
                objects.push(object);
            } else {
                const property: PropertyView = {
                    name: propertyNode.getName(),
                    kebab: _.kebabCase(propertyNode.getName()),
                    camel: _.camelCase(propertyNode.getName()),
                    pascal: _pascalCase(propertyNode.getName()),
                    htmlType: convertDataTypeToHTMLType(propertyNode.getType()),
                    jsType: convertDataTypeToJSType(propertyNode.getType()),
                }
                properties.push(property);
            }
        }

        return {
            name: node.getName(),
            kebab: kebab,
            camel: camel,
            pascal: pascal,
            properties: properties,
            objects: objects,
        };
    }
}

function convertDataTypeToHTMLType(type: number): string {
    let inputType;
    switch (type) {
        case PropertyNode.TYPE_STRING:
            inputType = "text";
            break;
        case PropertyNode.TYPE_NUMBER:
            inputType = "number";
            break;
        case PropertyNode.TYPE_OBJECT:
            inputType = "object";
            break;
        default:
            throw new Error(`Unkown data type: ${type}`);
    }
    return inputType;
}

function convertDataTypeToJSType(type: number): string {
    let inputType;
    switch (type) {
        case PropertyNode.TYPE_STRING:
            inputType = "string";
            break;
        case PropertyNode.TYPE_NUMBER:
            inputType = "number";
            break;
        case PropertyNode.TYPE_OBJECT:
            inputType = "Object";
            break;
        default:
            throw new Error(`Unkown data type: ${type}`);
    }
    return inputType;
}

interface PropertyView {
    name: string;
    camel: string;
    pascal: string;
    kebab: string;
    htmlType: string;
    jsType: string;
}

interface ObjectView {
    name: string;
    camel: string;
    pascal: string;
    kebab: string;
    property: {
        name: string;
        camel: string;
        pascal: string;
        kebab: string;
    };
}

interface DataView {
    name: string;
    camel: string;
    pascal: string;
    kebab: string;
    properties: PropertyView[];
    objects: ObjectView[];
}

