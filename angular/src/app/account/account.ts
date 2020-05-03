import { Data } from 'src/app/data';

export class Account extends Data {
  public name: string;
  public phone: string;
  public website: string;
  public address: string;

  constructor() { super() }

  from(data: Account) {
    this._id = data._id;
    this.name = data.name;
    this.phone = data.phone;
    this.website = data.website;
    this.address = data.address;
    return this;
  }

  static from(data: Account) {
    const _this = new Account();
    _this.from(data);
    return _this;
  }

}