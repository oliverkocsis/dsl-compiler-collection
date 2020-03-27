import * as Mustache from 'mustache';
import { AngularTempate } from "./templates/angular-template";
import { AbstractSyntaxGraph, PropertyNode } from '../../abstract-syntax-graph/abstract-syntax-graph';
import { VirtualFileSystem } from '../../virtual-file-system/virtual-file-system';
import { File } from '../../virtual-file-system/virtual-file-system';
import { Backend } from '../backend';
import * as _ from 'lodash';

const _pascalCase = _.flow(_.camelCase, _.upperFirst);

export class AngularBackend implements Backend {

    constructor() { }

    public generate(abstractSyntaxGraph: AbstractSyntaxGraph): VirtualFileSystem {
        const virtualFileSystem: VirtualFileSystem = new VirtualFileSystem();
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
                    type: convertDataTypeToHTMLInputType((node as PropertyNode).getType()),
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
            // Form Component HTML
            name = `${kebab}-form.component.html`;
            data = Mustache.render(AngularTempate.getFormComponentHTMLTemplate(), view);
            virtualFileSystem.appendChild(new File(name, data));
            // Form Component scss
            name = `${kebab}-form.component.scss`;
            data = Mustache.render(AngularTempate.getFormComponentSCSSTemplate(), view);
            virtualFileSystem.appendChild(new File(name, data));
            // Form Component TS
            name = `${kebab}-form.component.ts`;
            data = Mustache.render(AngularTempate.getFormComponentTSTemplate(), view);
            virtualFileSystem.appendChild(new File(name, data));
        }
        return virtualFileSystem;
    }
}

function convertDataTypeToHTMLInputType(type: number): string | undefined {
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