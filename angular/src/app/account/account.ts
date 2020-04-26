import { Address } from '../address/address';
import { Contact } from '../contact/contact';

export class Account {
  public name: string;
  public parent: string;
  public type: string;
  public phone: string;
  public website: string;
  public address: Address
  public contacts: Contact[];

  constructor() { }

  from(data: Account) {
    this.name = data.name;
    this.parent = data.parent;
    this.type = data.type;
    this.phone = data.phone;
    this.website = data.website;
    this.address = data.address ? Address.from(data.address) : null;
    this.contacts = this.contacts ? this.contacts.map((contact: Contact) => Contact.from(contact)) : null;
    return this;
  }

  static from(data: Account) {
    const _this = new Account();
    _this.from(data);
    return _this;
  }
}
