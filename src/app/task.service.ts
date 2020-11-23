import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface Task {
  title: string;
  date: BehaviorSubject<moment.Moment>;
  done: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}
  toShowTasks(day: moment.Moment): void {}
}
