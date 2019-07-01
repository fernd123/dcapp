import { Customer } from './customer';
export class Measure {
    id: number;
    weight: number; //peso
    waist: number; //cintura
    biceps: number;//biceps
    leg: number;   //pierna
    chest: number; //pecho
    gluteus: number; //glúteo
    maxFrecueny: number; // Para ciclistas
    minFrecuency: number;// Para ciclistas
    createAt: Date;
    customer: Customer;
}