import { Globals } from './../../../services/globals';
import { Parent } from './../../../shared/models/parent';
import { Customer } from './../../../shared/models/customer';
import { Measure } from './../../../shared/models/measure';
import { MeasureService } from './../../../services/measure.service';
import { MessageService } from './../../../services/message.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from './../../../services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-measure',
  templateUrl: './new-measure.component.html',
  styleUrls: ['./new-measure.component.css']
})
export class NewMeasureComponent extends Parent implements OnInit {

  measureForm: FormGroup;
  displayDialog = false;

  constructor(public customerService: CustomerService,
    public measureService: MeasureService,
    private formBuilder: FormBuilder,
    public messageService: MessageService) { super(); }

  ngOnInit() {
    this.messageService.clearMessages();
    this.displayDialog = true;
    this.titulo = this.measureService.selectedMeasure == null ? 'Nueva Medida' : `Editar Medida: ${this.customerService.selectedCustomer.name} ${this.customerService.selectedCustomer.lastname}`;

    this.measureForm = this.formBuilder.group({
      weight: [this.measureService.selectedMeasure != null ?
        this.measureService.selectedMeasure.weight : null],
      waist: [this.measureService.selectedMeasure != null ?
        this.measureService.selectedMeasure.waist : null],
      biceps: [this.measureService.selectedMeasure != null ?
        this.measureService.selectedMeasure.biceps : null],
      leg: [this.measureService.selectedMeasure != null ?
        this.measureService.selectedMeasure.leg : null],
      chest: [this.measureService.selectedMeasure != null ?
        this.measureService.selectedMeasure.chest : null],
      gluteus: [this.measureService.selectedMeasure != null ?
        this.measureService.selectedMeasure.gluteus : null],
      maxFrecueny: [this.measureService.selectedMeasure != null ?
        this.measureService.selectedMeasure.maxFrecueny : null],
      minFrecuency: [this.measureService.selectedMeasure != null ?
        this.measureService.selectedMeasure.minFrecuency : null]
    });
  }

  close() {
    this.measureForm.reset();
    this.measureService.showNewMeasureDialog = false;
  }

  save() {
    let measure: Measure = this.createMeasure();
    this.isLoading = true;
    if (this.measureService.selectedMeasure != null) {
      this.measureService.updateMeasure(measure).subscribe(
        (res => {
          console.log(res);
          this.messageService.setMessage('success', 'Éxito', 'Medida actualizada correctamente');
          this.customerService.getCustomerById(this.customerService.selectedCustomer.id).subscribe(
            (res: Customer) => {
              this.displayDialog = false;
              this.isLoading = false;
              this.customerService.selectedCustomer = res;
            }
          )
        }),
        (error => console.log(error))
      );
    } else {
      this.measureService.addMeasure(measure).subscribe(
        (res => {
          console.log(res);
          this.messageService.setMessage(Globals.SUCCESS_TYPE, Globals.SUCCESS, Globals.MEASURE_ADDED);
          this.customerService.getCustomerById(this.customerService.selectedCustomer.id).subscribe(
            (res: Customer) => {
              this.displayDialog = false;
              this.isLoading = false;
              this.customerService.selectedCustomer = res;
            }
          )
        }),
        (error => {
          this.messageService.setMessage(Globals.ERROR_TYPE, Globals.ERROR, error);
          this.isLoading = false;
        }
        ));
    }

  }

  createMeasure() {
    let measure: Measure = this.measureService.selectedMeasure != null ? this.measureService.selectedMeasure : new Measure();
    measure.weight = this.measureForm.get('weight').value;
    measure.waist = this.measureForm.get('waist').value;
    measure.biceps = this.measureForm.get('biceps').value;
    measure.leg = this.measureForm.get('leg').value;
    measure.chest = this.measureForm.get('chest').value;
    measure.gluteus = this.measureForm.get('gluteus').value;
    measure.maxFrecueny = this.measureForm.get('maxFrecueny').value;
    measure.minFrecuency = this.measureForm.get('minFrecuency').value;

    return measure;
  }

}
