import { Backend } from './backend';
import { AbstractSyntaxTree } from '../abstract-syntax-tree/abstract-syntax-tree';
import { Entity } from '../abstract-syntax-tree/entity';
import { SourceCode } from './source-code';
import * as https from 'https';

describe("The Backend", function () {

    let backEnd: Backend;
    let abstractSyntaxTree: AbstractSyntaxTree;
    let sourceCode: SourceCode[];

    const ENTITY_NAME = "My Entity Form"
    const EXPECTED_ENTITY_NAME_KEBAB = "my-entity-form"

    beforeAll(() => {
        backEnd = new Backend();
        abstractSyntaxTree = new AbstractSyntaxTree();
        abstractSyntaxTree.appendChild(new Entity(ENTITY_NAME));
        sourceCode = backEnd.generate(abstractSyntaxTree);
    });

    it("generates a component class and a component template", function () {
        expect(sourceCode.length).toBe(2);
    });

    describe("generates a component class", () => {
        it("with the name of <entity-name>.component.ts", function () {
            let index = sourceCode.map(x => x.name).indexOf(`${EXPECTED_ENTITY_NAME_KEBAB}.component.ts`);
            expect(index).toBeGreaterThan(-1);
        });

        it("with the content of a valid angular form class", function (done) {
            let index = sourceCode.map(x => x.name).indexOf(`${EXPECTED_ENTITY_NAME_KEBAB}.component.ts`);
            https.get("https://raw.githubusercontent.com/oliverkocsis/dcc-backend-angular/issue-1/src/app/my-entity-form/my-entity-form.component.ts", (res) => {
                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => {
                    try {
                        expect(sourceCode[index].data.toString().replace(/\s+/g, ' ')).toBe(rawData.replace(/\s+/g, ' '));
                        done();
                    } catch (e) {
                        console.error(e.message);
                        done.fail(e);
                    }
                });
            }).on('error', (e) => {
                console.error(e.message);
                done.fail(e);
            });
        });
    });

    describe("generates a html template", () => {
        it("with the name of <entity-name>.component.html", function () {
            let index = sourceCode.map(x => x.name).indexOf(`${EXPECTED_ENTITY_NAME_KEBAB}.component.html`);
            expect(index).toBeGreaterThan(-1);
        });

        it("with the content of a valid angular form", function (done) {
            let index = sourceCode.map(x => x.name).indexOf(`${EXPECTED_ENTITY_NAME_KEBAB}.component.html`);
            https.get("https://raw.githubusercontent.com/oliverkocsis/dcc-backend-angular/issue-1/src/app/my-entity-form/my-entity-form.component.html", (res) => {
                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => {
                    try {
                        expect(sourceCode[index].data.toString().replace(/\s+/g, ' ')).toBe(rawData.replace(/\s+/g, ' '));
                        done();
                    } catch (e) {
                        console.error(e.message);
                        done.fail(e);
                    }
                });
            }).on('error', (e) => {
                console.error(e.message);
                done.fail(e);
            });
        });
    });
});