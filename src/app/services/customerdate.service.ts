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

  customerDateCols = [];

  private uriEndPoint: string = Globals.URL_ENDPOINT_LOCAL + Globals.URL_DATES;

  constructor(private http: HttpClient,
    private customerService: CustomerService) { }

  fetchDates(){
    return this.http.get<any[]>(Globals.URL_ENDPOINT_LOCAL+"/api/customerdates")
      .pipe(map(res => {
        return res.map(event => {
          debugger;
          let eventObj = {
            id: event[0],
            customer: event[1],
            title: event[1] != undefined ?
            `${event[2]} ${event[3]}` : 'Cita',
            start:  addHours(new Date(event[4]), -2),
            end: addHours(new Date(event[5]), -2),
            color: { primary: event.color, secondary: "#D1E8FF" },
            draggable: true,
            meta: {
              event
            }
          };
          return eventObj;
        });
      }));
  }
  getDates() {
    return this.http.get<CustomerDate>(this.uriEndPoint);
  }

  getDateById(id: string) {
    return this.http.get(this.uriEndPoint + `/${id}`);
  }

  getDatesByCustomer(id: string) {
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
