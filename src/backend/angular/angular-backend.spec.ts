import { AbstractSyntaxGraph, DataNode, PropertyNode } from '../../abstract-syntax-graph/abstract-syntax-graph';
import { AngularBackend } from './angluar-backend';
import { readFileSync } from 'fs';
import { VirtualFileSystem, Directory, VirtualFileSystemNode } from '../../virtual-file-system/virtual-file-system';
import { File } from '../../virtual-file-system/virtual-file-system';

describe("The AngularBackend", function () {

    const backend = new AngularBackend();
    const abstractSyntaxGraph = new AbstractSyntaxGraph();

    const address = new DataNode("Address");
    address.appendChildNode(new PropertyNode("Street", PropertyNode.TYPE_STRING));
    address.appendChildNode(new PropertyNode("City", PropertyNode.TYPE_STRING));
    address.appendChildNode(new PropertyNode("State", PropertyNode.TYPE_STRING));
    address.appendChildNode(new PropertyNode("Country", PropertyNode.TYPE_STRING));
    address.appendChildNode(new PropertyNode("Postal Code", PropertyNode.TYPE_STRING));

    const account = new DataNode("Account");
    account.appendChildNode(new PropertyNode("Name", PropertyNode.TYPE_STRING));
    account.appendChildNode(new PropertyNode("Address", PropertyNode.TYPE_OBJECT).appendChildNode(address));
    account.appendChildNode(new PropertyNode("Phone", PropertyNode.TYPE_STRING));
    account.appendChildNode(new PropertyNode("Website", PropertyNode.TYPE_STRING))
    abstractSyntaxGraph.appendChildNode(account);

    const root = backend.generate(abstractSyntaxGraph);

    const directories = [
        '/src',
        '/src/app',
        '/src/app/address/address',
        '/src/app/address/address-form',
        '/src/app/address/address-list',
        '/src/app/address/address-table',
        '/src/app/account/address',
        '/src/app/account/address-form',
        '/src/app/account/address-list',
        '/src/app/account/address-table',
    ]

    for (const directory of directories) {
        it(`generates '${directory}' directory`, function () {
            const dir = root.getChildNode(directory);
            expect(dir).toBeDefined();
            expect(dir.getType()).toBe(VirtualFileSystemNode.DIRECTORY);
        });
    }

    const files = [
        '/src/app/app-routing.module.ts',
        '/src/app/app.component.html',
        '/src/app/app.component.scss',
        '/src/app/app.component.ts',
        '/src/app/app.module.ts',
        '/src/app/address/address/address.component.html'
    ]

    for (const data of ['address', 'account']) {
        for (const directory of ['', '-form', '-list', '-table']) {
            files.push(`/src/app/${data}/${data + directory}/${data + directory}.component.html`);
            files.push(`/src/app/${data}/${data + directory}/${data + directory}.component.scss`);
            files.push(`/src/app/${data}/${data + directory}/${data + directory}.component.ts`);
        }
    }

    for (const file of files) {
        it(`generates '${file}' file`, function () {
            expectFile(root, file).toBe(`angular${file}`);
        });
    }

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