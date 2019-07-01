import { Measure } from './../../shared/models/measure';
import { MeasureService } from './../../services/measure.service';
import { MessageService } from './../../services/message.service';
import { Customer } from './../../shared/models/customer';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-profile-customer',
  templateUrl: './profile-customer.component.html',
  styleUrls: ['./profile-customer.component.css']
})
export class ProfileCustomerComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    public customerService: CustomerService,
    public measureService: MeasureService,
    public messageService: MessageService,
    private _location: Location) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      debugger;
      let id = params['id'];
      this.customerService.getCustomerById(id).subscribe(
        ((res: Customer) => this.customerService.selectedCustomer = res),
        (error => console.log(error))
      );
    });
  }

  onTabChange(event) {
    console.log(event);
  }

  showNewCustomer(customer: Customer = this.customerService.selectedCustomer) {
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
    this._location.back();
  }

}
