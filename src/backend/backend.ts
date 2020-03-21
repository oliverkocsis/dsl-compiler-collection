import * as Mustache from 'mustache';
import { AngularTempate } from "./angular/angular-template";
import { AbstractSyntaxGraph } from '../abstract-syntax-graph/abstract-syntax-graph';
import { Project } from '../project/project';
import { File } from '../project/file';
import { convertToKebabCase, convertToCamelCase, convertToPascalCase } from './case-converter';


export class Backend {

    constructor() { }

    public generate(abstractSyntaxGraph: AbstractSyntaxGraph): Project {
        const project: Project = new Project("default");
        for (const node of abstractSyntaxGraph.getChildNodes()) {
            let kebab = convertToKebabCase(node.getName());
            let camel = convertToCamelCase(node.getName());
            let pascal = convertToPascalCase(node.getName());
            let name;
            let data;
            // Readme
            name = `readme.md`;
            data = Mustache.render(AngularTempate.getReadmeTemplate(), { kebab: kebab, camel: camel, pascal: pascal });
            project.appendChild(new File(name, data));
            // Component Class
            name = `${kebab}.component.ts`;
            data = Mustache.render(AngularTempate.getFormComponentTSTemplate(), { kebab: kebab, camel: camel, pascal: pascal });
            project.appendChild(new File(name, data));
            // Component Template
            name = `${kebab}.component.html`;
            data = Mustache.render(AngularTempate.getFormComponentHTMLTemplate(), { kebab: kebab, camel: camel, pascal: pascal });
            project.appendChild(new File(name, data));
        }
        return project;
    }
}
