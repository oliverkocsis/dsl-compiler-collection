import { Data } from 'src/_dslcc/data';

export class Address extends Data {
  public street: string;
  public city: string;
  public state: string;
  public country: string;
  public postalCode: string;

  constructor() { super() }

  from(data: Address) {
    this._id = data._id;
    this.street = data.street;
    this.city = data.city;
    this.state = data.state;
    this.country = data.country;
    this.postalCode = data.postalCode;
    return this;
  }

  static from(data: Address) {
    const _this = new Address();
    _this.from(data);
    return _this;
  }
}
