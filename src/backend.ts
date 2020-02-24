import { AbstractSyntaxTree } from "./abstract-syntax-tree";

export class AngularBackend {
    generate(abstractSyntaxTree: AbstractSyntaxTree) {
        const files: File[] = [];
        for (const name of abstractSyntaxTree.getEntities()) {
            const componentClassContent = `export classe ${this.convertToCamelCase(name)} { }`;
            const componentClassFile = new File(`${this.convertToKebabCase(name)}.ts`, componentClassContent);
            files.push(componentClassFile);
            const componentTempltaeContent = `<div></div>`;
            const componentTemplateFile = new File(`${this.convertToKebabCase(name)}.html`, componentTempltaeContent);
            files.push(componentTemplateFile);
        }
        return files;
    }
    constructor() { }

    private convertToKebabCase(s: string) {
        return s.replace(/\s+/g, '-').toLowerCase();
    }

    private convertToCamelCase(s: string) {
        return s.replace(/\W+(.)/g, (match, chr) => {
            return chr.toUpperCase();
        });
    }
}

export class File {
    constructor(public name: string, public content: string) { }
}