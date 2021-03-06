import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

export interface Day {
  value: moment.Moment;
  active: boolean;
  disabled: boolean;
  selected: boolean;
}

export interface Week {
  days: Day[];
}

@Injectable({
  providedIn: 'root',
})
export class DateService {
  date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  constructor() {}

  goToMonth(dir: number): void {
    this.date.next(this.date.value.add(dir, 'month'));
  }

  goToDay(date: moment.Moment): void {
    const value = this.date.value.set({
      date: date.date(),
      month: date.month(),
    });
    this.date.next(value);
  }
}
