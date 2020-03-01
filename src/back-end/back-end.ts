import { AbstractSyntaxTree } from "../abstract-syntax-tree/abstract-syntax-tree";
import { SourceCode } from "./source-code";
import { COMPONENT_CLASS, COMPONENT_HTML } from './angular.templates'
import * as Mustache from 'mustache';

export class BackEnd {

    constructor() { }

    public generate(abstractSyntaxTree: AbstractSyntaxTree): SourceCode[] {
        const sourceCode: SourceCode[] = new Array();
        for (const node of abstractSyntaxTree.getChildNodes()) {
            let kebab = this.convertToKebabCase(node.getName());
            let camel = this.convertToCamelCase(node.getName());
            let pascal = this.convertToPascalCase(node.getName());
            let name;
            let data;
            // Component Class
            name = `${kebab}.component.ts`;
            data = Mustache.render(COMPONENT_CLASS.toString(), { kebab: kebab, camel: camel, pascal: pascal });
            sourceCode.push(new SourceCode(name, Buffer.from(data)));
            // Component Template
            name = `${kebab}.component.html`;
            data = Mustache.render(COMPONENT_HTML.toString(), { kebab: kebab, camel: camel, pascal: pascal });
            sourceCode.push(new SourceCode(name, Buffer.from(data)));
        }
        return sourceCode;
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

export class File {
    constructor(public name: string, public content: string) { }
}