import { MessageService } from './message.service';
import { Globals } from './globals';
import { HttpClient } from '@angular/common/http';
import { Measure } from './../shared/models/measure';
import { Injectable } from '@angular/core';
import { CustomerService } from './customer.service';
import { FileUploader } from 'ng2-file-upload';

@Injectable()

export class FileService {

    selectedMeasure: Measure;
    showNewMeasureDialog: boolean = false;
    showFileCustomerDialog : boolean = false;
    type : string;


    private uriEndPoint: string = Globals.URL_ENDPOINT_LOCAL + Globals.URL_FILE;

    constructor(private customerService: CustomerService) { }

    getUploader(): any {
        return new FileUploader({ url: Globals.URL_ENDPOINT_LOCAL + Globals.URL_FILE + "/"
        + this.type + "/" + this.customerService.selectedCustomer.id, autoUpload: true });
    }
}
