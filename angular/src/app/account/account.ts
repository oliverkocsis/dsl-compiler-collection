export class Account {
  public name: string;
  public parent: string;
  public type: string;
  public phone: string;
  public website: string;

  constructor() { }

  from(data: Account) {
    this.name = data.name;
    this.parent = data.parent;
    this.type = data.type;
    this.phone = data.phone;
    this.website = data.website;
    return this;
  }

  static from(data: Account) {
    const _this = new Account();
    _this.from(data);
    return _this;
  }
}
