import { Parent } from './../../shared/models/parent';
import { Measure } from './../../shared/models/measure';
import { MeasureService } from './../../services/measure.service';
import { MessageService } from './../../services/message.service';
import { Customer } from './../../shared/models/customer';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-customer',
  templateUrl: './profile-customer.component.html',
  styleUrls: ['./profile-customer.component.css']
})
export class ProfileCustomerComponent extends Parent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    public customerService: CustomerService,
    public measureService: MeasureService,
    public messageService: MessageService,
    private _location: Location) { super(); }

  ngOnInit() {
    this.messageService.clearMessages();
    this.isLoading = true;
    debugger;
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.customerService.getCustomerById(id).subscribe(
        ((res: Customer) => {
          this.customerService.selectedCustomer = res;
          if (this.customerService.selectedCustomer.sex == 'Hombre') {
            this.measureService.measureCols = [
              { field: 'createAt', header: 'Fecha' },
              { field: 'weight', header: 'Peso (kg)' },
              { field: 'waist', header: 'Cintura (cm)' },
              { field: 'biceps', header: 'Biceps (cm)' },
              { field: 'leg', header: 'Pierna (cm)' },
              { field: 'chest', header: 'Pecho (cm)' },
            ];
          } else if (this.customerService.selectedCustomer.sex == 'Mujer') {
            this.measureService.measureCols = [
              { field: 'createAt', header: 'Fecha' },
              { field: 'weight', header: 'Peso (kg)' },
              { field: 'waist', header: 'Cintura (cm)' },
              { field: 'biceps', header: 'Biceps (cm)' },
              { field: 'leg', header: 'Pierna (cm)' },
              { field: 'chest', header: 'Pecho (cm)' },
              { field: 'gluteus', header: 'Glúteo (cm)' }
            ];
          }
          this.isLoading = false;
        }),
        (error => {
          console.log(error);
          this.isLoading = false;
        }
        ));
    });
  }

  onTabChange(event) {
    console.log(event);
  }

  showNewCustomer(customer: Customer = this.customerService.selectedCustomer) {
    debugger;
    if (customer == null) {
      this.customerService.selectedCustomer = null;
    }
    this.customerService.showNewCustomerDialog = true;
  }

  showNewMeasure(measure: Measure = this.measureService.selectedMeasure) {
    if (measure == null) {
      this.measureService.selectedMeasure = null;
    }
    this.measureService.showNewMeasureDialog = true;
  }

  back() {
    this.messageService.clearMessages();
    this._location.back();
  }

}
