import { Customer } from './customer';

export class CustomerDate {
    id: string;
    date: Date;
    start: Date;
    end: Date;
    customer: Customer;
    observations: string;
    createAt: Date;
    color: String;

    setColor(color: string) { this.color = color; }
    setStartDate(date: Date) { this.start = date; }
    setEndDate(date: Date) { this.end = date; }
    setCustomer(customer: Customer) { this.customer = customer; }
    setObservations(observations: string){ this.observations = observations; }

}