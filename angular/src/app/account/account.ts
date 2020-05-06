import { Address } from '../address/address';
import { Contact } from '../contact/contact';

export class Account {
  public $$id?: string;
  public name?: string;
  public phone?: string;
  public website?: string;
  public address?: Address;
  public contacts?: Contact[];
}