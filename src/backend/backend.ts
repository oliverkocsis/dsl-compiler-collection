import { Domain } from "../domain/domain";
import { VirtualFileSystem } from "../virtual-file-system/virtual-file-system";

export interface Backend {
    generate(domain: Domain): VirtualFileSystem;
}

export { AngularBackend } from './angular/angluar-backend';