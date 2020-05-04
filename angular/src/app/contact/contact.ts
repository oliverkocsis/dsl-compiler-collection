import { Data } from 'src/app/data';

export class Contact extends Data {
    public firstName: string;
    public lastName: string;
    public jobTitle: string;
    public phone: string;
    public email: string;

  constructor() { super() }

    from(data: Contact) {
        this._id = data._id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.jobTitle = data.jobTitle;
        this.phone = data.phone;
        this.email = data.email;
        return this;
    }

    static from(data: Contact) {
        const _this = new Contact();
        _this.from(data);
        return _this;
    }

}