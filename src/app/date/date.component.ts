import { MessageService } from './../services/message.service';
import { HttpClient } from '@angular/common/http';
import { CustomDateFormatter } from './customer-date-formatter.provider';
import { Globals } from 'src/app/services/globals';
import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerDateService } from './../services/customerdate.service';
import { CustomerService } from './../services/customer.service';
import { ConfirmationService } from 'primeng/api';
import { map } from 'rxjs/operators';
import { CustomerDate } from './../shared/models/customerDate';
import { Component, ChangeDetectionStrategy, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CalendarEvent, CalendarView, DAYS_OF_WEEK, CalendarEventTimesChangedEvent, CalendarDateFormatter } from 'angular-calendar';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
  addHours
} from 'date-fns';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';


interface ICustomerData {
  start: string;
  end: string;
  color: string;
}

@Component({
  selector: 'date-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ],
  templateUrl: './date.component.html',
})
export class DateComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: any;
  @ViewChild('modalCustomerDate', { static: true }) modalCustomerDate: any;


  selectedCustomer: any;
  selectedDate: any;

  viewDate: Date = new Date();
  events$: Observable<CalendarEvent[]>;
  refresh: Subject<any> = new Subject();

  view: CalendarView = CalendarView.Month;
  locale: string = 'es';
  excludeDays: number[] = [0];
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SUNDAY, DAYS_OF_WEEK.SATURDAY];
  clickedDate: Date;
  clickedColumn: number;
  CalendarView = CalendarView;
  activeDayIsOpen: boolean = false;
  //events: CalendarEvent[] = [];

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  modalCustomerDateData: {
    start: any;
    end: any;
    customers: any;
  }

  constructor(private http: HttpClient,
    private modal: NgbModal,
    private modalReference: NgbActiveModal,
    private messageService: MessageService,
    private router: Router,
    private customerDateService: CustomerDateService,
    private customerService: CustomerService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.fetchEvents();
  }

  /**
   * Retrieve all the events
   */
  fetchEvents(): void {
    this.events$ = this.customerDateService.fetchDates();
    debugger;
  }

  dayClicked({ date, events }: { date: Date; events: Array<CalendarEvent<{ film: ICustomerData }>>; }): void {
    this.viewDate = date;
    this.setView(CalendarView.Week);
  }

  eventClicked(event: CalendarEvent<{ film: ICustomerData }>): void {

  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    /*this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
    */
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'sm' });
  }


  addEvent(date: any): void {
    if (date != undefined) {
      this.selectedDate = date;
    }

    if (this.selectedCustomer == undefined && this.customerService.selectedCustomer == undefined) {
      this.customerService.getCustomers().subscribe(
        ((res: any) => {
          let customers = [];
          for (let i = 0; i < res.length; i++) {
            if (i == 0) { this.selectedCustomer = res[i].id };
            customers.push({ label: `${res[i].name} ${res[i].lastname}`, value: res[i].id });
          }
          let start = addHours(date, 0);
          let end = addHours(date, 0.5);
          this.modalCustomerDateData = { start, end, customers };
          this.modal.open(this.modalCustomerDate, { size: 'lg' });
        })
      )
    } else {
      let customer = this.selectedCustomer;
      if (this.selectedCustomer == undefined) {
        customer = this.customerService.selectedCustomer.id;
      }
      let dateN = this.createDate(this.selectedDate);
      this.customerDateService.addDate(dateN, customer).subscribe(
        (res => {
          //this.loadEvents();
          //this.messageService.setMessage(Globals.SUCCESS_TYPE, Globals.SUCCESS,'Cita Registrada con éxito');
          this.refresh.next();
          //this.events$ = undefined;
          this.fetchEvents();

          // Si no hay una cita, porque se asigna a un cliente sin acceder a la ficha de cliente
          // se tiene que deseleccionar el cliente para que pueda volver a asignar una cita a otro cliente diferente
          if (date == undefined) {
            this.selectedCustomer = undefined;
            this.modalCustomerDate._parentView.component.modal.dismissAll();
          }

          this.confirmationService.confirm({
            header: Globals.SUCCESS,
            message: `Cita Registrada con éxito`,
            rejectVisible: false,
            acceptLabel: 'Aceptar',
            accept: () => {
            }
          });
        }),
        (error => {
          debugger;
        })
      )
    }
  }

  deleteEvent(eventToDelete: any) {
    this.customerDateService.deleteDate(eventToDelete.id).subscribe(
      (res => {
        this.refresh.next();
        this.fetchEvents();
        this.modalContent._parentView.component.modal.dismissAll();
        this.confirmationService.confirm({
          header: Globals.SUCCESS,
          message: `Cita Eliminada con éxito`,
          rejectVisible: false,
          acceptLabel: 'Aceptar',
          accept: () => {
          }
        });
      })
    )
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  clickHour(date) {
    console.log(date);
    this.addEvent(date);
  }

  createDate(date: any): any {
    let dateN: CustomerDate = new CustomerDate();
    date = new Date(date).toISOString();
    dateN.setStartDate(addHours(date, 2)); //+2 por UTC
    dateN.setEndDate(addHours(date, 2.5));

    return dateN;
  }

  goToCustomerView() {
    let id: any = this.customerService.selectedCustomer != undefined ? this.customerService.selectedCustomer.id : undefined;
    if (id == undefined) {
      this.router.navigate(['/customers']);
    } else {
      this.router.navigate(['/customerProfile', id]);
    }
  }
}