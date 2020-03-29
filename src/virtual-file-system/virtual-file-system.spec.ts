import { Root, Directory, File, VirtualFileSystemNode } from './virtual-file-system';

describe('A VirtualFileSystemNode', function () {
    it('can visit its nodes', function () {
        const virtualFileSystem = new Root();
        const directoryA = new Directory('A');
        virtualFileSystem.appendChild(directoryA);
        directoryA.appendChild(new File('X', '1'));
        directoryA.appendChild(new File('Y', '2'));
        const directoryB = new Directory('B');
        virtualFileSystem.appendChild(directoryB);
        directoryB.appendChild(new File('Z', '3'));
        directoryB.appendChild(new File('W', '4'));
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
});