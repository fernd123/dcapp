import { Globals } from './../../services/globals';
import { Router } from '@angular/router';
import { Parent } from './../../shared/models/parent';
import { MessageService } from './../../services/message.service';
import { Customer } from './../../shared/models/customer';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Glob } from 'glob';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html'
})
export class NewCustomerComponent extends Parent implements OnInit {
  customerForm: FormGroup;
  displayDialog = false;

  constructor(private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router,
    public messageService: MessageService) { super(); }

  ngOnInit() {
    //this.messageService.clearMessages();
    this.displayDialog = true;
    this.titulo = this.customerService.selectedCustomer == null ? 'Nuevo Cliente' : `Editar Cliente: ${this.customerService.selectedCustomer.name} ${this.customerService.selectedCustomer.lastname}`;

    this.customerForm = this.formBuilder.group({
      name: [this.customerService.selectedCustomer != null ?
        this.customerService.selectedCustomer.name : '', Validators.required],
      lastname: [this.customerService.selectedCustomer != null ?
        this.customerService.selectedCustomer.lastname : '', Validators.required],
      sex: [this.customerService.selectedCustomer != null ?
        this.customerService.selectedCustomer.sex : 'Hombre', Validators.required],
      height: [this.customerService.selectedCustomer != null ?
        this.customerService.selectedCustomer.height : '', Validators.required],
      city: [this.customerService.selectedCustomer != null ?
        this.customerService.selectedCustomer.city : ''],
      birthday: [this.customerService.selectedCustomer != null ?
        this.customerService.selectedCustomer.birthday : '', Validators.required],
      phone: [this.customerService.selectedCustomer != null ?
        this.customerService.selectedCustomer.phone : '', Validators.required],
      email: [this.customerService.selectedCustomer != null ?
        this.customerService.selectedCustomer.email : '', Validators.required],
      observations: [this.customerService.selectedCustomer != null ?
        this.customerService.selectedCustomer.observations : '']
    });
  }

  save() {
    this.isLoading = true;
    let customer: Customer = this.createCustomer();
    if (this.customerService.selectedCustomer != null) {
      this.customerService.updateCustomer(customer).subscribe(
        (res => {
          console.log(res);
          this.messageService.setMessage(Globals.SUCCESS_TYPE,
             Globals.SUCCESS, Globals.CUSTOMER_UPDATED);
          this.customerService.refreshCustomers();
          this.isLoading = false;
          this.displayDialog = false;
        }),
        (error => console.log(error))
      );
    } else {
      this.customerService.addCustomer(customer).subscribe(
        ( (res : Customer) => {
          this.customerService.selectedCustomer = customer;
          this.router.navigate(['customerProfile', res.id]);
          this.isLoading = false;
          this.displayDialog = false;
          this.customerService.showNewCustomerDialog = false;
          this.messageService.setMessage(Globals.SUCCESS_TYPE,
            Globals.SUCCESS, Globals.CUSTOMER_ADDED);
        }),
        (error => this.messageService.setMessage(Globals.ERROR_TYPE,
          Globals.ERROR, error))
      );
    }
  }

  close() {
    this.customerForm.reset();
    this.customerService.showNewCustomerDialog = false;
  }

  createCustomer() {
    let customer: Customer = this.customerService.selectedCustomer != null ? this.customerService.selectedCustomer : new Customer();
    customer.name = this.customerForm.get('name').value;
    customer.lastname = this.customerForm.get('lastname').value;
    customer.birthday = this.customerForm.get('birthday').value;
    customer.city = this.customerForm.get('city').value;
    customer.email = this.customerForm.get('email').value;
    customer.height = this.customerForm.get('height').value;
    customer.phone = this.customerForm.get('phone').value;
    customer.sex = this.customerForm.get('sex').value;
    customer.observations = this.customerForm.get('observations').value;

    return customer;
  }
}
