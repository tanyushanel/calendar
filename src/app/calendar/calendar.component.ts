import { DateService, Week } from './../date.service';
import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  calendar: Week[];

  constructor(
    private dateService: DateService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.dateService.date.subscribe(this.toGenerateMonth.bind(this));
  }

  toGenerateMonth(now: moment.Moment): void {
    const startDay = now.clone().startOf('month').startOf('week');
    const endDay = now.clone().endOf('month').endOf('week');

    const date = startDay.clone().subtract(1, 'day'); // not to lose startPoint

    const calendar = [];

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !now.isSame(value, 'month');
            const selected = now.isSame(value, 'date');

            return { value, active, disabled, selected };
          }),
      });
    }

    this.calendar = calendar;
  }

  toSelectDay(day: moment.Moment): void {
    this.dateService.goToDay(day);
    this.taskService.toShowTasks(day);
  }
}
