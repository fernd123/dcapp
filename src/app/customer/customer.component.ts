import { Parent } from './../shared/models/parent';
import { MessageService } from './../services/message.service';
import { ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../services/customer.service';
import { Customer } from '../shared/models/customer';
import { Router } from '@angular/router';
import { Globals } from '../services/globals';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent extends Parent implements OnInit {

  searchBy: string;
  newCustomer: boolean = false;

  constructor(public customerService: CustomerService,
    private router: Router,
    private confirmationService: ConfirmationService,
    public messageService: MessageService) {
    super();
  }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'lastname', header: 'Apellidos' },
      { field: 'sex', header: 'Sexo' },
      { field: 'birthday', header: 'Edad' },
      { field: 'email', header: 'Email' }
    ];
    this.isLoading = true;

    this.customerService.getCustomers().subscribe(
      (res: Customer[]) => {
        this.customerService.customers = res;
        this.isLoading = false;
      },
      (error => { console.log(error); this.isLoading = false; })
    );
  }

  showNewCustomer(customer: Customer = this.customerService.selectedCustomer) {
    if (customer == null) {
      this.customerService.selectedCustomer = null;
    }
    this.customerService.showNewCustomerDialog = true;
  }

  viewCustomer() {
    this.router.navigate(['customerProfile', this.customerService.selectedCustomer.id]);
  }

  deleteCustomer() {
    this.confirmationService.confirm({
      header: Globals.CONFIRMATION,
      message: `¿Estás seguro que deseas borrar al cliente <b>${this.customerService.selectedCustomer.name} ${this.customerService.selectedCustomer.lastname}</b>?`,
      accept: () => {
        this.customerService.deleteCustomer(this.customerService.selectedCustomer).subscribe(
          (res => {
            this.customerService.selectedCustomer = null;
            this.customerService.refreshCustomers();
            this.messageService.setMessage(Globals.SUCCESS_TYPE, Globals.SUCCESS,
              Globals.CUSTOMER_REMOVED);
          }),
          (error => this.messageService.setMessage(Globals.ERROR_TYPE, Globals.ERROR, error))
        );
      }
    });
  }

  searchCustomer() {
    this.isLoading = true;
    console.log(this.searchBy);
    this.customerService.searchByKeyword(this.searchBy).subscribe(
      ((res: Customer[]) => { this.customerService.customers = res; this.isLoading = false; }),
      (error => console.log(error))
    )
  }

  clearSearchCustomer() {
    this.searchBy = '';
    this.searchCustomer();
  }

  public onRowSelect(event) {
    console.log(this.customerService.selectedCustomer);
  }
}
