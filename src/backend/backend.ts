import * as Mustache from 'mustache';
import { AngularTempate } from "./angular/angular-template";
import { AbstractSyntaxGraph } from '../abstract-syntax-graph/abstract-syntax-graph';
import { Project } from '../project/project';
import { File } from '../project/file';

export class Backend {

    constructor() { }

    public generate(abstractSyntaxGraph: AbstractSyntaxGraph): Project {
        const project: Project = new Project("default");
        for (const node of abstractSyntaxGraph.getChildNodes()) {
            let kebab = this.convertToKebabCase(node.getName());
            let camel = this.convertToCamelCase(node.getName());
            let pascal = this.convertToPascalCase(node.getName());
            let name;
            let data;
            // Component Class
            name = `${kebab}.component.ts`;
            data = Mustache.render(AngularTempate.getComponentClassTemplate(), { kebab: kebab, camel: camel, pascal: pascal });
            project.appendChild(new File(name, Buffer.from(data)));
            // Component Template
            name = `${kebab}.component.html`;
            data = Mustache.render(AngularTempate.getComponentHTMLTemplate(), { kebab: kebab, camel: camel, pascal: pascal });
            project.appendChild(new File(name, Buffer.from(data)));
        }
        return project;
    }

    private convertToKebabCase(s: string) {
        return s.replace(/\s+/g, '-').toLowerCase();
    }

    private convertToPascalCase(s: string) {
        return s.replace(/\W+(.)/g, (match, chr) => {
            return chr.toUpperCase();
        });
    }

    private convertToCamelCase(s: string) {
        const word = this.convertToPascalCase(s);
        return word.charAt(0).toLowerCase() + word.substr(1)
    }
}
