export class ShippingInformation {
    public company: string;
    public firstName: string;
    public lastName: string;
    public address: string;
    public city: string;
    public postalCode: number;

    constructor() { }

    from(shippingInformation: ShippingInformation) {
        this.company = shippingInformation.company;
        this.firstName = shippingInformation.firstName;
        this.lastName = shippingInformation.lastName;
        this.address = shippingInformation.address;
        this.city = shippingInformation.city;
        this.postalCode = shippingInformation.postalCode;
        return this;
    }

    static from(shippingInformation: ShippingInformation) {
        const _this = new ShippingInformation();
        _this.from(shippingInformation);
        return _this;
    }
}
