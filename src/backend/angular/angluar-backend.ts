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
        const virtualFileSystem: VirtualFileSystem = new VirtualFileSystem();
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
        });

        this.generateApp(app, dataNodes);

        return virtualFileSystem;
    }

    public generateData(node: DataNode, parent: VirtualFileSystemNode): Directory {
        let name;
        let data;
        const view = this.generateDataView(node);

        // Directory
        const directory = new Directory(view.kebab);
        parent.appendChild(directory);
        // Data Component
        this.generateDataComponent(node, directory);
        // Data Form
        this.generateDataForm(node, directory);
        // Data Table
        this.generateDataTable(node, directory);

        return directory;
    }

    public generateDataComponent(node: DataNode, parent: VirtualFileSystemNode): VirtualFileSystemNode {
        let name;
        let data;
        const view = this.generateDataView(node);
        // Class
        name = `${view.kebab}.ts`;
        data = Mustache.render(AngularTempate.getClassTemplate(), view);
        parent.appendChild(new File(name, data));
        // Service
        name = `${view.kebab}.service.ts`;
        data = Mustache.render(AngularTempate.getServiceTemplate(), view);
        parent.appendChild(new File(name, data));
        // Component HTML
        name = `${view.kebab}.component.html`;
        data = Mustache.render(AngularTempate.getComponentHTMLTemplate(), view);
        parent.appendChild(new File(name, data));
        // Component scss
        name = `${view.kebab}.component.scss`;
        data = Mustache.render(AngularTempate.getComponentSCSSTemplate(), view);
        parent.appendChild(new File(name, data));
        // Component TS
        name = `${view.kebab}.component.ts`;
        data = Mustache.render(AngularTempate.getComponentTSTemplate(), view);
        parent.appendChild(new File(name, data));

        return parent;
    }

    public generateDataForm(node: DataNode, parent: VirtualFileSystemNode): VirtualFileSystemNode {
        let name;
        let data;
        const view = this.generateDataView(node);

        // Form Directory
        const directory = new Directory(`${view.kebab}-form`);
        parent.appendChild(directory);
        // Form Component HTML
        name = `${view.kebab}-form.component.html`;
        data = Mustache.render(AngularTempate.getFormComponentHTMLTemplate(), view);
        directory.appendChild(new File(name, data));
        // Form Component scss
        name = `${view.kebab}-form.component.scss`;
        data = Mustache.render(AngularTempate.getFormComponentSCSSTemplate(), view);
        directory.appendChild(new File(name, data));
        // Form Component TS
        name = `${view.kebab}-form.component.ts`;
        data = Mustache.render(AngularTempate.getFormComponentTSTemplate(), view);
        directory.appendChild(new File(name, data));

        return directory;
    }

    public generateDataTable(node: DataNode, parent: VirtualFileSystemNode): VirtualFileSystemNode {
        let name;
        let data;
        const view = this.generateDataView(node);

        // Table Directory
        const directory = new Directory(`${view.kebab}-table`);
        parent.appendChild(directory);
        // Table Component HTML
        name = `${view.kebab}-table.component.html`;
        data = Mustache.render(AngularTempate.getTableComponentHTMLTemplate(), view);
        directory.appendChild(new File(name, data));
        // Table Component scss
        name = `${view.kebab}-table.component.scss`;
        data = Mustache.render(AngularTempate.getTableComponentSCSSTemplate(), view);
        directory.appendChild(new File(name, data));
        // Table Component TS
        name = `${view.kebab}-table.component.ts`;
        data = Mustache.render(AngularTempate.getTableComponentTSTemplate(), view);
        directory.appendChild(new File(name, data));

        return directory;
    }

    public generateApp(dir: Directory, dataNodes: DataNode[]) {
        let name;
        let data;

        let view = dataNodes.map((value: DataNode) => this.generateDataView(value));

        // Routing
        name = `app-routing.module.ts`;
        data = Mustache.render(AngularTempate.getRoutingTemplate(), view);
        dir.appendChild(new File(name, data));
    }

    public generateDataView(node: DataNode) {
        const kebab = _.kebabCase(node.getName());
        const camel = _.camelCase(node.getName());
        const pascal = _pascalCase(node.getName());

        const properties = node.getChildNodes().map((node) => {
            return {
                name: node.getName(),
                kebab: _.kebabCase(node.getName()),
                camel: _.camelCase(node.getName()),
                pascal: _pascalCase(node.getName()),
                htmlType: convertDataTypeToHTMLType((node as PropertyNode).getType()),
                jsType: convertDataTypeToJSType((node as PropertyNode).getType()),
            }
        });

        return {
            name: node.getName(),
            kebab: kebab,
            camel: camel,
            pascal: pascal,
            properties: properties
        };
    }
}

function convertDataTypeToHTMLType(type: number): string | undefined {
    let inputType;
    switch (type) {
        case PropertyNode.TYPE_STRING:
            inputType = "text";
            break;
        case PropertyNode.TYPE_NUMBER:
            inputType = "number";
            break;
        default:
            break;
    }
    return inputType;
}

function convertDataTypeToJSType(type: number): string | undefined {
    let inputType;
    switch (type) {
        case PropertyNode.TYPE_STRING:
            inputType = "string";
            break;
        case PropertyNode.TYPE_NUMBER:
            inputType = "number";
            break;
        default:
            break;
    }
    return inputType;
}

