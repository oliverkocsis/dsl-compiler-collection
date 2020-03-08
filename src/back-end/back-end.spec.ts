import { BackEnd } from './back-end';
import { AbstractSyntaxTree } from '../abstract-syntax-tree/abstract-syntax-tree';
import { Entity } from '../abstract-syntax-tree/entity';
import { SourceCode } from './source-code';
import * as https from 'https';

describe("The BackEnd", function () {

    let backEnd: BackEnd;
    let abstractSyntaxTree: AbstractSyntaxTree;
    let sourceCode: SourceCode[];

    const ENTITY_NAME = "My Entity Form"
    const EXPECTED_ENTITY_NAME_KEBAB = "my-entity-form"
    const EXPECTED_ENTITY_CLASS_URL = "https://raw.githubusercontent.com/oliverkocsis/dcc-backend-angular/issue-1/src/app/my-entity-form/my-entity-form.component.ts";
    let EXPECTED_ENTITY_CLASS: string;
    const EXPECTED_ENTITY_TEMPLATE_URL = "https://raw.githubusercontent.com/oliverkocsis/dcc-backend-angular/issue-1/src/app/my-entity-form/my-entity-form.component.html";
    let EXPECTED_ENTITY_TEMPLATE: string;

    beforeAll(async (done) => {
        backEnd = new BackEnd();
        abstractSyntaxTree = new AbstractSyntaxTree();
        abstractSyntaxTree.appendChild(new Entity(ENTITY_NAME));
        sourceCode = backEnd.generate(abstractSyntaxTree);
        https.get(EXPECTED_ENTITY_CLASS_URL, (res) => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    EXPECTED_ENTITY_CLASS = rawData;
                    console.log(EXPECTED_ENTITY_CLASS);
                    done();
                } catch (e) {
                    console.error(e.message);
                    done.fail(e);
                }

            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
        https.get(EXPECTED_ENTITY_TEMPLATE_URL, (res) => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    EXPECTED_ENTITY_TEMPLATE = rawData;
                    console.log(EXPECTED_ENTITY_TEMPLATE);
                    done();
                } catch (e) {
                    console.error(e.message);
                    done.fail(e);
                }

            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    });

    it("generates a component class and a component template", function () {
        expect(sourceCode.length).toBe(2);
    });

    it("the name of the component class is <entity-name>.component.ts", function () {
        let index = sourceCode.map(x => x.name).indexOf(`${EXPECTED_ENTITY_NAME_KEBAB}.component.ts`);
        expect(index).toBeGreaterThan(-1);
    });

    it("the name of the component template is <entity-name>.component.html", function () {
        let index = sourceCode.map(x => x.name).indexOf(`${EXPECTED_ENTITY_NAME_KEBAB}.component.html`);
        expect(index).toBeGreaterThan(-1);
    });


    it("the content of the component class is a valid angular form class", function () {
        let index = sourceCode.map(x => x.name).indexOf(`${EXPECTED_ENTITY_NAME_KEBAB}.component.ts`);
        expect(sourceCode[index].data.toString()).toBe(EXPECTED_ENTITY_CLASS);
    });

    it("the content of the component template is a valid angular form template", function () {
        let index = sourceCode.map(x => x.name).indexOf(`${EXPECTED_ENTITY_NAME_KEBAB}.component.html`);
        expect(sourceCode[index].data.toString()).toBe(entity_component_template);
    });


});


const entity_component_template = `<p>my-domain works!</p>
`