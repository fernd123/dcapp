import { Parent } from './../../shared/models/parent';
import { Measure } from './../../shared/models/measure';
import { Customer } from './../../shared/models/customer';
import { MessageService } from './../../services/message.service';
import { ConfirmationService } from 'primeng/api';
import { MeasureService } from './../../services/measure.service';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/services/globals';

@Component({
  selector: 'app-measure-customer',
  templateUrl: './measure-customer.component.html',
  styleUrls: ['./measure-customer.component.css']
})
export class MeasureCustomerComponent extends Parent implements OnInit {

  constructor(public customerService: CustomerService,
    public measureService: MeasureService,
    private confirmationService: ConfirmationService,
    public messageService: MessageService) { super(); }

  ngOnInit() {
    this.messageService.clearMessages();
    /*
    this.cols = [
      { field: 'createAt', header: 'Fecha' },
      { field: 'weight', header: 'Peso (kg)' },
      { field: 'waist', header: 'Cintura (cm)' },
      { field: 'biceps', header: 'Biceps (cm)' },
      { field: 'leg', header: 'Pierna (cm)' },
      { field: 'chest', header: 'Pecho (cm)' },
      { field: 'gluteus', header: 'Glúteo (cm)' },
      { field: 'maxFrecueny', header: 'Frec. Máxima' },
      { field: 'minFrecuency', header: 'Frec. Mínima' }
    ];
    */
  }

  onRowSelect(event) {
    console.log(this.measureService.selectedMeasure);
  }

  showNewMeasure(id: number) {
    if (id == null) {
      this.measureService.selectedMeasure = null;
    } else {
      this.measureService.getMeasureById(id).subscribe(
        (res: Measure) => {
          this.measureService.selectedMeasure = res;
          this.measureService.showNewMeasureDialog = true;
        });
    }
  }

  deleteMeasure(id: number) {
    this.measureService.getMeasureById(id).subscribe(
      (res: Measure) => {
        this.measureService.selectedMeasure = res;
      });

    this.confirmationService.confirm({
      header: Globals.CONFIRMATION,
      message: `¿Estás seguro que deseas borrar la medida del cliente <b>${this.customerService.selectedCustomer.name} ${this.customerService.selectedCustomer.lastname}</b>?`,
      accept: () => {
        this.measureService.deleteMeasure(this.measureService.selectedMeasure).subscribe(
          (res => {
            this.measureService.selectedMeasure = null;
            this.customerService.getCustomerById(this.customerService.selectedCustomer.id).subscribe(
              ((res: Customer) => this.customerService.selectedCustomer = res)
            )
            this.messageService.setMessage(Globals.SUCCESS_TYPE, Globals.SUCCESS, Globals.MEASURE_REMOVED);
          }),
          (error => this.messageService.setMessage(Globals.ERROR_TYPE, Globals.ERROR, error))
        );
      }
    });
  }
}
