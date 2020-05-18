import { Domain } from "../domain/domain";
import { VirtualFileSystem } from "../virtual-file-system/virtual-file-system";

export interface Frontend {
    parse(root: VirtualFileSystem): Domain;
}

export { JsonSchemaFronted } from './json-schema/json-schema-frontend';