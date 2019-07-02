import { MessageService } from './../services/message.service';
import { ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../services/customer.service';
import { Customer } from '../shared/models/customer';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  cols: any[];
  searchBy: string;

  newCustomer: boolean = false;

  constructor(public customerService: CustomerService,
    private router: Router,
    private confirmationService: ConfirmationService,
    public messageService: MessageService) { }

  ngOnInit() {

    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'lastname', header: 'Apellidos' },
      { field: 'sex', header: 'Sexo' },
      { field: 'birthday', header: 'Edad' },
      { field: 'email', header: 'Email' }
    ];

    this.customerService.refreshCustomers();
  }


  showNewCustomer(customer: Customer = this.customerService.selectedCustomer) {
    if (customer == null) {
      this.customerService.selectedCustomer = null;
    }
    this.customerService.showNewCustomerDialog = true;
  }

  viewCustomer(){
    this.router.navigate(['customerProfile', this.customerService.selectedCustomer.id]);
  }

  deleteCustomer() {
    this.confirmationService.confirm({
      header: 'Confirmación',
      message: `¿Estás seguro que deseas borrar al cliente <b>${this.customerService.selectedCustomer.name} ${this.customerService.selectedCustomer.lastname}</b>?`,
      accept: () => {
        this.customerService.deleteCustomer(this.customerService.selectedCustomer).subscribe(
          (res => {
            this.customerService.selectedCustomer = null;
            this.customerService.refreshCustomers();
            this.messageService.setMessage('success', 'Éxito', 'Cliente eliminado correctamente');
          }),
          (error => this.messageService.setMessage('error', 'Error', error))
        ); 
      }
    });
  }

  searchCustomer(){
    console.log(this.searchBy);
    this.customerService.searchByKeyword(this.searchBy).subscribe(
      ( (res: Customer[] ) => this.customerService.customers = res ),
      (error => console.log(error))
    )
  }

  clearSearchCustomer(){
    this.searchBy = '';
    this.searchCustomer();
  }

  public onRowSelect(event) {
    console.log(this.customerService.selectedCustomer);
  }
}
