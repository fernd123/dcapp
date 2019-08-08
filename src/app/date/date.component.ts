import { CustomDateFormatter } from './customer-date-formatter.provider';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarDateFormatter,
  CalendarView,
  DAYS_OF_WEEK
} from 'angular-calendar';
import { colors } from './colors';
import { DayViewHour, MonthViewDay, WeekViewHourColumn } from 'calendar-utils';
import { CalendarMonthViewDay } from 'angular-calendar';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'date.component.html',
  styleUrls: ['date.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class DateComponent implements OnInit {

  excludeDays: number[] = [0];

  view: CalendarView = CalendarView.Day;

  viewDate = new Date();

  locale: string = 'es';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  CalendarView = CalendarView;
  selectedDays: any = [];
  dayView: DayViewHour[];
  weekHour: WeekViewHourColumn[];

  selectedMonthViewDay: CalendarMonthViewDay;
  selectedDayViewDate: Date;
  setView(view: CalendarView) {
    this.view = view;
  }

  events: CalendarEvent[] = [
    {
      title: 'Draggable event',
      color: colors.yellow,
      start: new Date(),
      draggable: true
    },
    {
      title: 'A non draggable event',
      color: colors.blue,
      start: new Date()
    }
  ];

  refresh: Subject<any> = new Subject();

  ngOnInit() {
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }



  //DAY SELECTION
  dayClicked(day: CalendarMonthViewDay): void {
    this.selectedMonthViewDay = day;
    debugger;
    const selectedDateTime = this.selectedMonthViewDay.date.getTime();
    const dateIndex = this.selectedDays.findIndex(
      selectedDay => selectedDay.date.getTime() === selectedDateTime
    );
    if (dateIndex > -1) {
      delete this.selectedMonthViewDay.cssClass;
      this.selectedDays.splice(dateIndex, 1);
    } else {
      this.selectedDays.push(this.selectedMonthViewDay);
      day.cssClass = 'cal-day-selected';
      this.selectedMonthViewDay = day;
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (
        this.selectedDays.some(
          selectedDay => selectedDay.date.getTime() === day.date.getTime()
        )
      ) {
        day.cssClass = 'cal-day-selected';
      }
    });
  }

  hourSegmentClicked(date: Date) {
    this.selectedDayViewDate = date;
    this.addSelectedDayViewClass();
  }

  beforeDayViewRender(dayView: DayViewHour[]) {
    this.dayView = dayView;
    this.addSelectedDayViewClass();
  }

  private addSelectedDayViewClass() {
    this.dayView.forEach(hourSegment => {
      hourSegment.segments.forEach(segment => {
        delete segment.cssClass;
        console.log(this.selectedDayViewDate + ' -- '+segment.date );
        if (this.selectedDayViewDate && segment.date.getTime() === this.selectedDayViewDate.getTime()) {
          segment.cssClass = 'cal-day-selected';
          debugger;
        }
      });
    });
  }


  beforeWeekViewRender(weekHour: WeekViewHourColumn[]) {
    this.weekHour = weekHour;
    this.addSelectedDayViewClass();
  }

  hourSegmentWeekClicked(date: Date) {
    this.selectedDayViewDate = date;
    this.addSelectedDayMonthViewClass();
  }

  private addSelectedDayMonthViewClass() {
    /*this.weekHour.forEach(hourSegment => {
      hourSegment.segme.forEach(segment => {
        delete segment.cssClass;
        console.log(this.selectedDayViewDate + ' -- '+segment.date );
        if (this.selectedDayViewDate && segment.date.getTime() === this.selectedDayViewDate.getTime()) {
          segment.cssClass = 'cal-day-selected';
          debugger;
        }
      });
    }); */
  }

}
