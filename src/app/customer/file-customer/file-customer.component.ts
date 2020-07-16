import { FileUploader } from 'ng2-file-upload';
import { FileService } from './../../services/file.service';
import { MessageService } from './../../services/message.service';
import { Parent } from '../../shared/models/parent';
import { CustomerService } from '../../services/customer.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Globals } from 'src/app/services/globals';

@Component({
  selector: 'app-file-customer',
  templateUrl: './file-customer.component.html'
})
export class FileCustomerComponent extends Parent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  displayDialog = false;
  titulo: string = '';
  uploader: FileUploader;
  isDropOver: boolean;

  constructor(private customerService: CustomerService,
    public messageService: MessageService,
    private fileService: FileService) { super(); }

  ngOnInit() {
    this.displayDialog = true;
    this.titulo = this.fileService.type == 'T' ? 'Subir Entrenamiento' : 'Subir Dieta';
    this.uploader = this.fileService.getUploader();
    this.uploader.onCompleteAll = () => {
      this.messageService.setMessage(Globals.SUCCESS_TYPE,
        Globals.SUCCESS, Globals.FILE_SUCCESS);
      this.displayDialog = false;
    }
  }

  fileOverAnother(e: any): void {
    this.isDropOver = e;
  }

  fileClicked() {
    this.fileInput.nativeElement.click();
  }

  close() {
    this.fileService.showFileCustomerDialog = false;
  }
}
