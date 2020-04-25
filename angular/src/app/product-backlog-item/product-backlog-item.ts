export class ProductBacklogItem {
    public name: string;
    public description: string;
    public order: number;
    public estimate: number;
    public value: number;
    public completeness: number;

    constructor() { }

    from(data: ProductBacklogItem) {
        this.name = data.name;
        this.description = data.description;
        this.order = data.order;
        this.estimate = data.estimate;
        this.value = data.value;
        this.completeness = data.completeness;
        return this;
    }

    static from(data: ProductBacklogItem) {
        const _this = new ProductBacklogItem();
        _this.from(data);
        return _this;
    }
}
