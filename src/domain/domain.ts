export class Domain {

    private entities: Map<string, Entity>;

    constructor() {
        this.entities = new Map<string, Entity>();
    }

    public addEntity(entity: Entity) {
        return this.entities.set(entity.name, entity);
    }

    public getEntities(): Entity[] {
        return Array.from(this.entities.values());
    }

    public linkEntities(one: Attribute, two: Attribute) {
        throw new Error("Not implemented yet");
    }
    
}

export class BasicType {
    public static readonly Text = new BasicType("BasicType:Text");
    public static readonly Number = new BasicType("BasicType:Number");

    constructor(public name: string) { };
}

export class Value extends BasicType {

    private attributes: Map<string, Attribute>;

    constructor(name: string) {
        super(name);
        this.attributes = new Map<string, Attribute>();
    }

    public addAttribute(name: string, type: BasicType = BasicType.Text, list: boolean = false) {
        this.attributes.set(name, new Attribute(name, type, list));
    }

    public getAttributes(): Attribute[] {
        return Array.from(this.attributes.values());
    }

}

export class Entity extends Value { }

export class Attribute {

    constructor(public name: string, public type: BasicType = BasicType.Text, public list: boolean = false) { }

}