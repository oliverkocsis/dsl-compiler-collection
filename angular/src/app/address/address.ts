import { Data } from 'src/app/data';

export class Address extends Data {
    public street: string;
    public city: string;
    public state: string;
    public country: string;
    public postalCode: string;
}