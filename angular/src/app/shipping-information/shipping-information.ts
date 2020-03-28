export class ShippingInformation {
    public company: string;
    public firstName: string;
    public lastName: string;
    public address: string;
    public city: string;
    public postalCode: number;

    constructor() { }

    from(data: ShippingInformation) {
        this.company = data.company;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.address = data.address;
        this.city = data.city;
        this.postalCode = data.postalCode;
        return this;
    }

    static from(data: ShippingInformation) {
        const _this = new ShippingInformation();
        _this.from(data);
        return _this;
    }
}
