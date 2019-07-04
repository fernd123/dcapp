import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Customer } from '../shared/models/customer';
import { Message, MessageService } from 'primeng/api';
import { map } from 'rxjs/operators';

@Injectable()
export class CustomerService {

  customers: Customer[] = [];
  selectedCustomer: Customer;
  showNewCustomerDialog: boolean = false;
  token: string = "";

  private uriEndPoint: string = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get(this.uriEndPoint);
  }

  getCustomerById(id: number) {
    return this.http.get(this.uriEndPoint + `/${id}`);
  }

  refreshCustomers(): void {
    this.getCustomers().subscribe(
      ((res: Customer[]) => this.customers = res),
      (error => console.log(error))
    );
  }

  searchByKeyword(keyword: string) {
    let params: HttpParams = new HttpParams().set("keyword", keyword);
    return this.http.get(this.uriEndPoint + '/find', { params });
  }

  addCustomer(customer: Customer) {
    return this.http.post(this.uriEndPoint, customer);
  }

  updateCustomer(customer: Customer) {
    return this.http.put(this.uriEndPoint + `/${customer.id}`, customer);
  }

  deleteCustomer(customer: Customer) {
    return this.http.delete(this.uriEndPoint + `/${customer.id}`);
  }

}
