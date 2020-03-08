import { AbstractSyntaxGraph } from '../abstract-syntax-graph/abstract-syntax-graph';
import { Backend } from './backend';
import { Entity } from '../abstract-syntax-graph/entity';
import * as https from 'https';
import { Project } from './project';
import { File } from './file';

describe("The Backend", function () {

    let backEnd: Backend;
    let abstractSyntaxTree: AbstractSyntaxGraph;
    let project: Project;

    const ENTITY_NAME = "My Entity Form"
    const EXPECTED_ENTITY_NAME_KEBAB = "my-entity-form"

    beforeAll(() => {
        backEnd = new Backend();
        abstractSyntaxTree = new AbstractSyntaxGraph();
        abstractSyntaxTree.appendChild(new Entity(ENTITY_NAME));
        project = backEnd.generate(abstractSyntaxTree);
    });

    it("generates a component class", function (done) {
        const file = project.getChildNode(`${EXPECTED_ENTITY_NAME_KEBAB}.component.ts`) as File;
        expect(file).toBeDefined();
        https.get("https://raw.githubusercontent.com/oliverkocsis/dcc-backend-angular/issue-1/src/app/my-entity-form/my-entity-form.component.ts", (res) => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    expect(file.getValue().toString().replace(/\s+/g, ' ')).toBe(rawData.replace(/\s+/g, ' '));
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

    it("generates a component template", function (done) {
        const file = project.getChildNode(`${EXPECTED_ENTITY_NAME_KEBAB}.component.html`) as File;
        expect(file).toBeDefined();
        https.get("https://raw.githubusercontent.com/oliverkocsis/dcc-backend-angular/issue-1/src/app/my-entity-form/my-entity-form.component.html", (res) => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    expect(file.getValue().toString().replace(/\s+/g, ' ')).toBe(rawData.replace(/\s+/g, ' '));
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