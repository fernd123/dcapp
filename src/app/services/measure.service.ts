import { Globals } from './globals';
import { HttpClient } from '@angular/common/http';
import { Measure } from './../shared/models/measure';
import { Injectable } from '@angular/core';
import { CustomerService } from './customer.service';

@Injectable()

export class MeasureService {

  measures: Measure [] = [];
  selectedMeasure: Measure;
  showNewMeasureDialog: boolean = false;

  measureCols = [];

  private uriEndPoint: string = Globals.URL_ENDPOINT_LOCAL+Globals.URL_MEASURES;

  constructor(private http: HttpClient,
    private customerService: CustomerService) { }

  getMeasures() {
    return this.http.get(this.uriEndPoint);
  }

  getMeasureById(id: number){
    return this.http.get(this.uriEndPoint+`/${id}`);
  }

  getMeasureByCustomerId(id: number){
    return this.http.get(this.uriEndPoint+`/${id}`);
  }

  refreshMeasures(): void {
    this.getMeasures().subscribe(
      ((res: Measure[]) => this.measures = res),
      (error => console.log(error))
    );
  }

  addMeasure(measure: Measure) {
    return this.http.post(this.uriEndPoint+`/${this.customerService.selectedCustomer.id}`, measure);
  }

  updateMeasure(measure: Measure) {
    return this.http.put(this.uriEndPoint + `/${measure.id}`, measure);
  }

  deleteMeasure(measure: Measure) {
    return this.http.delete(this.uriEndPoint + `/${measure.id}`);
  }
}
