export const DATA_CLASS_TEMPLATE = `export class {{pascal}} {
    {{#properties}}
    public {{camel}}: {{jsType}};
    {{/properties}}

    constructor() { }

    from(data: ShippingInformation) {
        {{#properties}}
        this.{{camel}} = data.{{camel}};
        {{/properties}}
        return this;
    }

    static from(data: {{pascal}}) {
        const _this = new {{pascal}}();
        _this.from(data);
        return _this;
    }
}
`