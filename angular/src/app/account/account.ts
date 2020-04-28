import { Data } from 'src/_dslcc/data';
import { Address } from '../address/address';

export class Account extends Data {
  public name: string;
  public parent: string;
  public type: string;
  public phone: string;
  public website: string;
  public address: string;

  constructor() { super() }

  from(data: Account) {
    this._id = data._id;
    this.name = data.name;
    this.parent = data.parent;
    this.type = data.type;
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
