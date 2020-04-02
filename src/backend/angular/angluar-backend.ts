import * as Mustache from 'mustache';
import { AngularTempate } from "./angular-template";
import { AbstractSyntaxGraph, PropertyNode } from '../../abstract-syntax-graph/abstract-syntax-graph';
import { Root, Directory } from '../../virtual-file-system/virtual-file-system';
import { File } from '../../virtual-file-system/virtual-file-system';
import { Backend } from '../backend';
import * as _ from 'lodash';

const _pascalCase = _.flow(_.camelCase, _.upperFirst);

export class AngularBackend implements Backend {

    constructor() { }

    public generate(abstractSyntaxGraph: AbstractSyntaxGraph): Root {
        const virtualFileSystem: Root = new Root();
        const src = new Directory('src');
        virtualFileSystem.appendChild(src);
        const app = new Directory('app');
        src.appendChild(app);
        for (const node of abstractSyntaxGraph.getChildNodes()) {

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
            const view = {
                name: node.getName(),
                kebab: kebab,
                camel: camel,
                pascal: pascal,
                properties: properties
            };
            let name;
            let data;
            // Readme
            name = `readme.md`;
            data = Mustache.render(AngularTempate.getReadmeTemplate(), view);
            virtualFileSystem.appendChild(new File(name, data));
            // Driectory
            const directory = new Directory(kebab);
            app.appendChild(directory);
            // Class
            name = `${kebab}.ts`;
            data = Mustache.render(AngularTempate.getClassTemplate(), view);
            directory.appendChild(new File(name, data));
            // Service
            name = `${kebab}.service.ts`;
            data = Mustache.render(AngularTempate.getServiceTemplate(), view);
            directory.appendChild(new File(name, data));
            // Form Directory
            const formDirectory = new Directory(`${kebab}-form`);
            directory.appendChild(formDirectory);
            // Form Component HTML
            name = `${kebab}-form.component.html`;
            data = Mustache.render(AngularTempate.getFormComponentHTMLTemplate(), view);
            formDirectory.appendChild(new File(name, data));
            // Form Component scss
            name = `${kebab}-form.component.scss`;
            data = Mustache.render(AngularTempate.getFormComponentSCSSTemplate(), view);
            formDirectory.appendChild(new File(name, data));
            // Form Component TS
            name = `${kebab}-form.component.ts`;
            data = Mustache.render(AngularTempate.getFormComponentTSTemplate(), view);
            formDirectory.appendChild(new File(name, data));
            // Table Directory
            const tableDirectory = new Directory(`${kebab}-table`);
            directory.appendChild(tableDirectory);
            // Table Component HTML
            name = `${kebab}-table.component.html`;
            data = Mustache.render(AngularTempate.getTableComponentHTMLTemplate(), view);
            tableDirectory.appendChild(new File(name, data));
            // Table Component scss
            name = `${kebab}-table.component.scss`;
            data = Mustache.render(AngularTempate.getTableComponentSCSSTemplate(), view);
            tableDirectory.appendChild(new File(name, data));
            // Table Component TS
            name = `${kebab}-table.component.ts`;
            data = Mustache.render(AngularTempate.getTableComponentTSTemplate(), view);
            tableDirectory.appendChild(new File(name, data));
        }
        return virtualFileSystem;
    }
}

function convertDataTypeToHTMLType(type: number): string | undefined {
    let inputType;
    switch (type) {
        case PropertyNode.TYPE_TEXT:
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
        case PropertyNode.TYPE_TEXT:
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