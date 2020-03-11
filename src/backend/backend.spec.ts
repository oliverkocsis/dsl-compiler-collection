import { AbstractSyntaxGraph } from '../abstract-syntax-graph/abstract-syntax-graph';
import { Backend } from './backend';
import { Entity } from '../abstract-syntax-graph/entity';
import * as https from 'https';
import { Project } from '../project/project';
import { File } from '../project/file';

describe("The Backend", function () {

    let backEnd: Backend;
    let abstractSyntaxTree: AbstractSyntaxGraph;
    let project: Project;

    const ENTITY_NAME = "My Entity Form";
    const EXPECTED_ENTITY_NAME_KEBAB = "my-entity-form";
    const EXPECTED_ENTITY_NAME_PASCAL = "MyEntityForm";

    const EXPECTED_GIT_BASE = "https://raw.githubusercontent.com/oliverkocsis/dcc-backend-angular/master";

    beforeAll(() => {
        backEnd = new Backend();
        abstractSyntaxTree = new AbstractSyntaxGraph();
        abstractSyntaxTree.appendChild(new Entity(ENTITY_NAME));
        project = backEnd.generate(abstractSyntaxTree);
    });

    it("generates a readme", function () {
        const file = project.getChildNode('readme.md') as File;
        expect(file).toBeDefined();
        expect(file.getValue().replace(/\s+/g, ' ')).toContain(`import { ${EXPECTED_ENTITY_NAME_PASCAL}Component } from './${EXPECTED_ENTITY_NAME_KEBAB}/${EXPECTED_ENTITY_NAME_KEBAB}.component';`);
    });

    it("generates a component class", function (done) {
        const file = project.getChildNode(`${EXPECTED_ENTITY_NAME_KEBAB}.component.ts`) as File;
        expect(file).toBeDefined();
        https.get(EXPECTED_GIT_BASE + "/src/app/my-entity-form/my-entity-form.component.ts", (res) => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    expect(file.getValue().replace(/\s+/g, ' ')).toBe(rawData.replace(/\s+/g, ' '));
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
        https.get(EXPECTED_GIT_BASE + "/src/app/my-entity-form/my-entity-form.component.html", (res) => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    expect(file.getValue().replace(/\s+/g, ' ')).toBe(rawData.replace(/\s+/g, ' '));
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