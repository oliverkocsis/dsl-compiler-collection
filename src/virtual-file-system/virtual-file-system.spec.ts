import { VirtualFileSystem, Directory, File, VirtualFileSystemNode } from './virtual-file-system';

describe('A VirtualFileSystemNode', () => {

    let virtualFileSystem: VirtualFileSystem;

    beforeAll(() => {
        virtualFileSystem = new VirtualFileSystem();
        const directoryA = new Directory('A');
        virtualFileSystem.appendChild(directoryA);
        directoryA.appendChild(new File('X', '1'));
        directoryA.appendChild(new File('Y', '2'));
        const directoryB = new Directory('B');
        virtualFileSystem.appendChild(directoryB);
        directoryB.appendChild(new File('Z', '3'));
        directoryB.appendChild(new File('W', '4'));
    });

    it('can visit its nodes', () => {
        let result = '';
        virtualFileSystem.visit((node: VirtualFileSystemNode) => {
            result = result + node.getPathName();
            if (node.getType() == VirtualFileSystemNode.FILE) {
                result = result + ':' + (node as File).getValue();
            }
            result = result + ';';
        });
        expect(result).toContain('/A;');
        expect(result).toContain('/A/X:1;');
        expect(result).toContain('/A/Y:2;');
        expect(result).toContain('/B;');
        expect(result).toContain('/B/Z:3;');
        expect(result).toContain('/B/W:4;');
    });

    it('can travers path', () => {
        let file: File;
        file = virtualFileSystem.getNode('A/X') as File;
        expect(file.getValue()).toBe('1');
        file = virtualFileSystem.getNode('A/Y') as File;
        expect(file.getValue()).toBe('2');
        file = virtualFileSystem.getNode('/B/Z') as File;
        expect(file.getValue()).toBe('3');
        file = virtualFileSystem.getNode('/B/W') as File;
        expect(file.getValue()).toBe('4');
    });

});