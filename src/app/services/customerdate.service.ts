import { map } from 'rxjs/operators';
import { Globals } from './globals';
import { HttpClient } from '@angular/common/http';
import { Measure } from '../shared/models/measure';
import { Injectable } from '@angular/core';
import { CustomerService } from './customer.service';
import { CustomerDate } from '../shared/models/customerDate';
import { addHours } from 'date-fns';

@Injectable()

export class CustomerDateService {

  dates: CustomerDate[] = [];
  selectedDate: CustomerDate;
  showNewMeasureDialog: boolean = false;

  measureCols = [];

  private uriEndPoint: string = Globals.URL_ENDPOINT_LOCAL + Globals.URL_DATES;

  constructor(private http: HttpClient,
    private customerService: CustomerService) { }

  fetchDates(){
    return this.http.get<any[]>("http://localhost:8080/api/customerdates")
      .pipe(map(res => {
        return res.map(event => {
          return {
            id: event.id,
            customer: event.customer,
            title: `${event.customer.name} ${event.customer.lastname}`,
            start: addHours(new Date(event.start), -2),
            end: addHours(new Date(event.end), -2),
            color: { primary: event.color, secondary: "#D1E8FF" },
            draggable: true,
            meta: {
              event
            }
          };
        });
      }));
  }
  getDates() {
    return this.http.get<CustomerDate>(this.uriEndPoint);
  }

  getDateById(id: number) {
    return this.http.get(this.uriEndPoint + `/${id}`);
  }

  getDatesByCustomer(id: number) {
    return this.http.get(this.uriEndPoint + `/${id}`);
  }

  refreshDates(): void {
    this.getDates().subscribe(
      ((res: any) => this.dates = res),
      (error => console.log(error))
    );
  }

  addDate(date: CustomerDate, customerId: number) {
    return this.http.post(this.uriEndPoint + `/${customerId}`, date);
  }

  updateDate(date: CustomerDate) {
    return this.http.put(this.uriEndPoint + `/${date.id}`, date);
  }

  deleteDate(id: string) {
    return this.http.delete(this.uriEndPoint + `/${id}`);
  }
}
