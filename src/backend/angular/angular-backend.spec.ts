import { AbstractSyntaxGraph, DataNode, PropertyNode } from '../../abstract-syntax-graph/abstract-syntax-graph';
import { AngularBackend } from './angluar-backend';
import { readFileSync } from 'fs';
import { VirtualFileSystem, Directory, VirtualFileSystemNode } from '../../virtual-file-system/virtual-file-system';
import { File } from '../../virtual-file-system/virtual-file-system';
import { Backend } from '../backend';

describe("The AngularBackend", function () {

    let backend: Backend;
    let abstractSyntaxGraph: AbstractSyntaxGraph;
    let root: VirtualFileSystem;
    let src: Directory;
    let app: Directory;
    let articleDir: Directory;
    let shippingInformationDir: Directory;

    const ARTICLE_NAME = "Article";
    const ARTICLE_KEBAB = "article";
    const SHIPPING_INFORMAIION_NAME = "Shipping Information";
    const SHIPPING_INFORMATION_KEBAB = "shipping-information";

    beforeAll(() => {
        backend = new AngularBackend();
        abstractSyntaxGraph = new AbstractSyntaxGraph();
        const article = new DataNode(ARTICLE_NAME);
        article.appendChildNode(new PropertyNode("Title", PropertyNode.TYPE_STRING));
        article.appendChildNode(new PropertyNode("Content", PropertyNode.TYPE_STRING));
        article.appendChildNode(new PropertyNode("Author", PropertyNode.TYPE_STRING))
        abstractSyntaxGraph.appendChildNode(article);
        const shippingInformation = new DataNode(SHIPPING_INFORMAIION_NAME);
        shippingInformation.appendChildNode(new PropertyNode("Company", PropertyNode.TYPE_STRING));
        shippingInformation.appendChildNode(new PropertyNode("First Name", PropertyNode.TYPE_STRING));
        shippingInformation.appendChildNode(new PropertyNode("Last Name", PropertyNode.TYPE_STRING));
        shippingInformation.appendChildNode(new PropertyNode("Address", PropertyNode.TYPE_STRING));
        shippingInformation.appendChildNode(new PropertyNode("City", PropertyNode.TYPE_STRING));
        shippingInformation.appendChildNode(new PropertyNode("Postal Code", PropertyNode.TYPE_NUMBER));
        abstractSyntaxGraph.appendChildNode(shippingInformation);
        root = backend.generate(abstractSyntaxGraph);
        src = root.getChildNode("src");
        app = src.getChildNode("app")
        articleDir = app.getChildNode(ARTICLE_KEBAB);
        shippingInformationDir = app.getChildNode(SHIPPING_INFORMATION_KEBAB);
    });

    it("generates a src and app directory", function () {
        expect(src.getType()).toBe(VirtualFileSystemNode.DIRECTORY);
        expect(app.getType()).toBe(VirtualFileSystemNode.DIRECTORY);
        expect(articleDir.getType()).toBe(VirtualFileSystemNode.DIRECTORY);
        expect(shippingInformationDir.getType()).toBe(VirtualFileSystemNode.DIRECTORY);
    });

    it("generates app-routing.module.ts", function () {
        const path = '/src/app/app-routing.module.ts';
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates app.component.html", function () {
        const path = '/src/app/app.component.html';
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates app.component.scss", function () {
        const path = '/src/app/app.component.scss';
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates app.component.ts", function () {
        const path = '/src/app/app.component.ts';
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates app.module.ts", function () {
        const path = '/src/app/app.module.ts';
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates article.ts", function () {
        const path = `${articleDir.getPathName()}/${ARTICLE_KEBAB}.ts`;
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates article.service.ts", function () {
        const path = `${articleDir.getPathName()}/${ARTICLE_KEBAB}.service.ts`;
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates article.component.html", function () {
        const path = `${articleDir.getPathName()}/${ARTICLE_KEBAB}.component.html`;
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates article.component.scss", function () {
        const path = `${articleDir.getPathName()}/${ARTICLE_KEBAB}.component.scss`;
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates article.component.ts", function () {
        const path = `${articleDir.getPathName()}/${ARTICLE_KEBAB}.component.ts`;
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates article-form.component.html", function () {
        const path = `${articleDir.getPathName()}/${ARTICLE_KEBAB}-form/${ARTICLE_KEBAB}-form.component.html`;
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates article-form.component.scss", function () {
        const path = `${articleDir.getPathName()}/${ARTICLE_KEBAB}-form/${ARTICLE_KEBAB}-form.component.scss`;
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates article-form.component.ts", function () {
        const path = `${articleDir.getPathName()}/${ARTICLE_KEBAB}-form/${ARTICLE_KEBAB}-form.component.ts`;
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates article-table.component.html", function () {
        const path = `${articleDir.getPathName()}/${ARTICLE_KEBAB}-table/${ARTICLE_KEBAB}-table.component.html`;
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates article-table.component.scss", function () {
        const path = `${articleDir.getPathName()}/${ARTICLE_KEBAB}-table/${ARTICLE_KEBAB}-table.component.scss`;
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates article-table.component.ts", function () {
        const path = `${articleDir.getPathName()}/${ARTICLE_KEBAB}-table/${ARTICLE_KEBAB}-table.component.ts`;
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates shipping-information.ts", function () {
        const path = `${shippingInformationDir.getPathName()}/${SHIPPING_INFORMATION_KEBAB}.ts`;
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates shipping-information.service.html", function () {
        const path = `${shippingInformationDir.getPathName()}/${SHIPPING_INFORMATION_KEBAB}.service.ts`;
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates shipping-information.component.html", function () {
        const path = `${shippingInformationDir.getPathName()}/${SHIPPING_INFORMATION_KEBAB}.component.html`;
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates shipping-information.component.scss", function () {
        const path = `${shippingInformationDir.getPathName()}/${SHIPPING_INFORMATION_KEBAB}.component.scss`;
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates shipping-information.component.ts", function () {
        const path = `${shippingInformationDir.getPathName()}/${SHIPPING_INFORMATION_KEBAB}.component.ts`;
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates shipping-information-form.component.html", function () {
        const path = `${shippingInformationDir.getPathName()}/${SHIPPING_INFORMATION_KEBAB}-form/${SHIPPING_INFORMATION_KEBAB}-form.component.html`;
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates shipping-information-form.component.scss", function () {
        const path = `${shippingInformationDir.getPathName()}/${SHIPPING_INFORMATION_KEBAB}-form/${SHIPPING_INFORMATION_KEBAB}-form.component.scss`;
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates shipping-information-form.component.ts", function () {
        const path = `${shippingInformationDir.getPathName()}/${SHIPPING_INFORMATION_KEBAB}-form/${SHIPPING_INFORMATION_KEBAB}-form.component.ts`;
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates shipping-information-table.component.html", function () {
        const path = `${shippingInformationDir.getPathName()}/${SHIPPING_INFORMATION_KEBAB}-table/${SHIPPING_INFORMATION_KEBAB}-table.component.html`;
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates shipping-information-table.component.scss", function () {
        const path = `${shippingInformationDir.getPathName()}/${SHIPPING_INFORMATION_KEBAB}-table/${SHIPPING_INFORMATION_KEBAB}-table.component.scss`;
        expectFile(root, path).toBe(`angular${path}`);
    });

    it("generates shipping-information-table.component.ts", function () {
        const path = `${shippingInformationDir.getPathName()}/${SHIPPING_INFORMATION_KEBAB}-table/${SHIPPING_INFORMATION_KEBAB}-table.component.ts`;
        expectFile(root, path).toBe(`angular${path}`);
    });
});

function expectFile(root: VirtualFileSystem, path: string) {
    const file = root.getNode(path) as File;
    expect(file).toBeDefined();
    return {
        toBe: function (path: string) {
            const expected = readFileSync(path);
            expect(file.getValue().replace(/\s+/g, ' ')).toBe(expected.toString().replace(/\s+/g, ' '));
        }
    }
}