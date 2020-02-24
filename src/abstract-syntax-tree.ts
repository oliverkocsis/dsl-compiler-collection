export class AbstractSyntaxTree {


    private entityRegister: any = {};
    private entityList: Entity[] = [];

    constructor() { }

    createEntity(name: string): Entity {
        let entity = new Entity(name);
        if (this.entityRegister[name] == undefined) {
            this.entityRegister[name] = this.entityList.length;
            this.entityList.push(entity);
        } else {
            throw new Error(`Entity exists`);
        }
        return entity;

    }

    getEntity(name: string): Entity {
        let entity;
        if (this.entityRegister[name] != undefined) {
            entity = this.entityList[this.entityRegister[name]]
        } else {
            throw new Error(`Entity does not exist`);
        }
        return entity;
    }

    getEntities(): string[] {
        const entities: string[] = [];
        for (const key in this.entityRegister) {
            if (this.entityRegister.hasOwnProperty(key)) {
                entities.push(key);
            }
        }
        return entities;
    }

}

export class Entity {
    constructor(public name: string) { }
}

