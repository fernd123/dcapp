import { CustomerDate } from './../../shared/models/customerDate';
import { CustomerDateService } from './../../services/customerdate.service';
import { Parent } from '../../shared/models/parent';
import { Customer } from '../../shared/models/customer';
import { MessageService } from '../../services/message.service';
import { ConfirmationService } from 'primeng/api';
import { CustomerService } from '../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/services/globals';

@Component({
  selector: 'app-date-customer',
  templateUrl: './date-customer.component.html'
})
export class DateCustomerComponent extends Parent implements OnInit {

  constructor(public customerService: CustomerService,
    public customerDateService: CustomerDateService,
    private confirmationService: ConfirmationService,
    public messageService: MessageService) { super(); }

  ngOnInit() {
    this.messageService.clearMessages();

    this.cols = [
      { field: 'date', header: 'Fecha' },
      { field: 'start', header: 'De' },
      { field: 'end', header: 'Hasta' }
    ];

  }

  onRowSelect(event) {
    console.log(this.customerDateService.selectedDate);
  }

  deleteDate(id: string) {
    debugger;
    this.customerDateService.getDateById(id).subscribe(
      (res: CustomerDate) => {
        this.customerDateService.selectedDate = res;
      });

    this.confirmationService.confirm({
      header: Globals.CONFIRMATION,
      key: 'dateDeleteDialog',
      message: `¿Estás seguro que deseas borrar la cita del cliente <b>${this.customerService.selectedCustomer.name} ${this.customerService.selectedCustomer.lastname}</b>?`,
      accept: () => {
        this.customerDateService.deleteDate(id).subscribe(
          (res => {
            this.customerDateService.selectedDate = null;
            this.customerService.getCustomerById(this.customerService.selectedCustomer.id).subscribe(
              ((res: Customer) => this.customerService.selectedCustomer = res)
            )
            this.messageService.setMessage(Globals.SUCCESS_TYPE, Globals.SUCCESS, Globals.DATE_REMOVED);
          }),
          (error => this.messageService.setMessage(Globals.ERROR_TYPE, Globals.ERROR, error))
        );
      },
      reject: () => {
        debugger;
      }
    });
  }
}
