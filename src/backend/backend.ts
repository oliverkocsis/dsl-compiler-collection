import * as Mustache from 'mustache';
import { AngularTempate } from "./angular/angular-template";
import { AbstractSyntaxGraph, PropertyNode } from '../abstract-syntax-graph/abstract-syntax-graph';
import { Project } from '../project/project';
import { File } from '../project/file';
import { convertToKebabCase, convertToCamelCase, convertToPascalCase } from './case-converter';


export class Backend {

    constructor() { }

    public generate(abstractSyntaxGraph: AbstractSyntaxGraph): Project {
        const project: Project = new Project("default");
        for (const node of abstractSyntaxGraph.getChildNodes()) {
            const kebab = convertToKebabCase(node.getName());
            const camel = convertToCamelCase(node.getName());
            const pascal = convertToPascalCase(node.getName());
            const properties = node.getChildNodes().map((node) => {
                return {
                    name: node.getName(),
                    kebab: convertToKebabCase(node.getName()),
                    camel: convertToCamelCase(node.getName()),
                    pascal: convertToPascalCase(node.getName()),
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
            project.appendChild(new File(name, data));
            // Form Component HTML
            name = `${kebab}-form.component.html`;
            data = Mustache.render(AngularTempate.getFormComponentHTMLTemplate(), view);
            project.appendChild(new File(name, data));
            // Form Component scss
            name = `${kebab}-form.component.scss`;
            data = Mustache.render(AngularTempate.getFormComponentSCSSTemplate(), view);
            project.appendChild(new File(name, data));
            // Form Component TS
            name = `${kebab}-form.component.ts`;
            data = Mustache.render(AngularTempate.getFormComponentTSTemplate(), view);
            project.appendChild(new File(name, data));
        }
        return project;
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