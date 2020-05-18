import * as Mustache from 'mustache';
import { AngularTempate } from "./angular-template";
import { Domain, Entity, Value, BasicType } from '../../domain/domain';
import { VirtualFileSystem, Directory, VirtualFileSystemNode } from '../../virtual-file-system/virtual-file-system';
import { File } from '../../virtual-file-system/virtual-file-system';
import { Backend } from '../backend';
import * as _ from 'lodash';

const _pascalCase = _.flow(_.camelCase, _.upperFirst);

export class AngularBackend implements Backend {

    constructor() { }

    public generate(domain: Domain): VirtualFileSystem {
        const virtualFileSystem = new VirtualFileSystem();
        const src = new Directory('src');
        virtualFileSystem.appendChild(src);
        const app = new Directory('app');
        src.appendChild(app);

        const entities = domain.getEntities();
        this.generateApp(app, entities);
        this.generateUtil(app);
        for (const entity of entities) {
            this.generateData(entity, app);
        }

        return virtualFileSystem;
    }

    public generateData(entity: Entity, parent: VirtualFileSystemNode): Directory {
        let name;
        let data;
        const view = this.generateDataView(entity);
        const directory = new Directory(view.kebab);
        parent.appendChild(directory);
        name = `${view.kebab}.ts`;
        data = Mustache.render(AngularTempate.data_ts(), view);
        directory.appendChild(new File(name, data));
        name = `${view.kebab}.service.ts`;
        data = Mustache.render(AngularTempate.data_service_ts(), view);
        directory.appendChild(new File(name, data));
        this.generateDataComponent(directory, view);
        this.generateDataForm(directory, view);
        this.generateDataList(directory, view);
        this.generateDataTable(directory, view);
        return directory;
    }

    public generateDataComponent(parent: VirtualFileSystemNode, view: DataView): VirtualFileSystemNode {
        let name;
        let data;
        const directory = new Directory(`${view.kebab}`);
        parent.appendChild(directory);
        name = `${view.kebab}.component.html`;
        data = Mustache.render(AngularTempate.data_component_html(), view);
        directory.appendChild(new File(name, data));
        name = `${view.kebab}.component.scss`;
        data = Mustache.render(AngularTempate.data_component_scss(), view);
        directory.appendChild(new File(name, data));
        name = `${view.kebab}.component.ts`;
        data = Mustache.render(AngularTempate.data_component_ts(), view);
        directory.appendChild(new File(name, data));
        return parent;
    }

    public generateDataForm(parent: VirtualFileSystemNode, view: DataView): VirtualFileSystemNode {
        let name;
        let data;
        const directory = new Directory(`${view.kebab}-form`);
        parent.appendChild(directory);
        name = `${view.kebab}-form.component.html`;
        data = Mustache.render(AngularTempate.data_form_component_html(), view);
        directory.appendChild(new File(name, data));
        name = `${view.kebab}-form.component.scss`;
        data = Mustache.render(AngularTempate.data_form_component_scss(), view);
        directory.appendChild(new File(name, data));
        name = `${view.kebab}-form.component.ts`;
        data = Mustache.render(AngularTempate.data_form_component_ts(), view);
        directory.appendChild(new File(name, data));
        return directory;
    }

    public generateDataList(parent: VirtualFileSystemNode, view: DataView): VirtualFileSystemNode {
        let name;
        let data;
        const directory = new Directory(`${view.kebab}-list`);
        parent.appendChild(directory);
        name = `${view.kebab}-list.component.html`;
        data = Mustache.render(AngularTempate.data_list_component_html(), view);
        directory.appendChild(new File(name, data));
        name = `${view.kebab}-list.component.scss`;
        data = Mustache.render(AngularTempate.data_list_component_scss(), view);
        directory.appendChild(new File(name, data));
        name = `${view.kebab}-list.component.ts`;
        data = Mustache.render(AngularTempate.data_list_component_ts(), view);
        directory.appendChild(new File(name, data));
        return directory;
    }

    public generateDataTable(parent: VirtualFileSystemNode, view: DataView): VirtualFileSystemNode {
        let name;
        let data;
        const directory = new Directory(`${view.kebab}-table`);
        parent.appendChild(directory);
        name = `${view.kebab}-table.component.html`;
        data = Mustache.render(AngularTempate.data_table_component_html(), view);
        directory.appendChild(new File(name, data));
        name = `${view.kebab}-table.component.scss`;
        data = Mustache.render(AngularTempate.data_table_component_scss(), view);
        directory.appendChild(new File(name, data));
        name = `${view.kebab}-table.component.ts`;
        data = Mustache.render(AngularTempate.data_table_component_ts(), view);
        directory.appendChild(new File(name, data));
        return directory;
    }

    public generateApp(dir: Directory, entities: Entity[]) {
        let name;
        let data;
        let view = {
            dataNodes: entities.map((value: Entity) => this.generateDataView(value))
        }
        name = `app-routing.module.ts`;
        data = Mustache.render(AngularTempate.app_routing_module_ts(), view);
        dir.appendChild(new File(name, data));
        name = `app.component.html`;
        data = Mustache.render(AngularTempate.app_component_html(), view);
        dir.appendChild(new File(name, data));
        name = `app.component.scss`;
        data = Mustache.render(AngularTempate.app_component_scss(), view);
        dir.appendChild(new File(name, data));
        name = `app.component.ts`;
        data = Mustache.render(AngularTempate.app_component_ts(), view);
        dir.appendChild(new File(name, data));
        name = `app.module.ts`;
        data = Mustache.render(AngularTempate.app_module_ts(), view);
        dir.appendChild(new File(name, data));
    }

    generateUtil(dir: Directory) {
        let name;
        name = `data.service.ts`;
        dir.appendChild(new File(name, AngularTempate.abstract_data_service_ts()));
        name = `data.ts`;
        dir.appendChild(new File(name, AngularTempate.abstract_data_ts()));
    }

    public generateDataView(entity: Entity): DataView {
        const kebab = _.kebabCase(entity.name);
        const camel = _.camelCase(entity.name);
        const pascal = _pascalCase(entity.name);

        const properties: PropertyView[] = [];
        const objects: ObjectView[] = [];
        for (const attribute of entity.getAttributes()) {

            if (attribute.type instanceof Value) {
                const object: ObjectView = {
                    name: attribute.type.name,
                    kebab: _.kebabCase(attribute.type.name),
                    camel: _.camelCase(attribute.type.name),
                    pascal: _pascalCase(attribute.type.name),
                    property: {
                        name: attribute.name,
                        kebab: _.kebabCase(attribute.name),
                        camel: _.camelCase(attribute.name),
                        pascal: _pascalCase(attribute.name),
                    }
                };
                objects.push(object);
            } else {
                const property: PropertyView = {
                    name: attribute.name,
                    kebab: _.kebabCase(attribute.name),
                    camel: _.camelCase(attribute.name),
                    pascal: _pascalCase(attribute.name),
                    htmlType: convertDataTypeToHTMLType(attribute.type.name),
                    jsType: convertDataTypeToJSType(attribute.type.name),
                }
                properties.push(property);
            }
        }

        return {
            name: entity.name,
            kebab: kebab,
            camel: camel,
            pascal: pascal,
            properties: properties,
            objects: objects,
        };
    }
}

function convertDataTypeToHTMLType(type: string): string {
    let inputType;
    switch (type) {
        case BasicType.Text.name:
            inputType = "text";
            break;
        case BasicType.Number.name:
            inputType = "number";
            break;;
        default:
            throw new Error(`Unkown data type: ${type}`);
    }
    return inputType;
}

function convertDataTypeToJSType(type: string): string {
    let inputType;
    switch (type) {
        case BasicType.Text.name:
            inputType = "string";
            break;
        case BasicType.Number.name:
            inputType = "number";
            break;
        default:
            throw new Error(`Unkown data type: ${type}`);
    }
    return inputType;
}

interface PropertyView {
    name: string;
    camel: string;
    pascal: string;
    kebab: string;
    htmlType: string;
    jsType: string;
}

interface ObjectView {
    name: string;
    camel: string;
    pascal: string;
    kebab: string;
    property: {
        name: string;
        camel: string;
        pascal: string;
        kebab: string;
    };
}

interface DataView {
    name: string;
    camel: string;
    pascal: string;
    kebab: string;
    properties: PropertyView[];
    objects: ObjectView[];
}

