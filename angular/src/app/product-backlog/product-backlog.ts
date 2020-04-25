export class ProductBacklog {
    public name: string;

    constructor() { }

    from(data: ProductBacklog) {
        this.name = data.name;
        return this;
    }

    static from(data: ProductBacklog) {
        const _this = new ProductBacklog();
        _this.from(data);
        return _this;
    }
}
