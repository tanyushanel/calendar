import { DateService } from './date.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

export class Task {
  id?: string;
  title: string;
  time?: moment.Moment;
  tasks?: Task[];
  done?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public url = 'https://angular-calendar-5f5eb.firebaseio.com/tasks';

  date: moment.Moment = this.dateService.date.value;

  tasks: Task[] = [];
  constructor(private http: HttpClient, private dateService: DateService) {}

  saveTask(task: Task, selectedTime: string): void {
    // this.http.post<any>(`${this.url}/${task.date}.json`, task).pipe(
    //   map((res) => {
    //     console.log(res);
    //     return res;
    //   })
    // );

    this.tasks.push(task);
    this.saveToLocalStore(task);
  }

  deleteTask(task: Task) {
    // this.tasks.filter((item) => item !== task);
  }

  getTasksByDate(date: moment.Moment): Task[] {
    let key;
    const keys = Object.keys(localStorage);

    for (let i = 0; (key = keys[i]); i++) {
      const task: Task = JSON.parse(localStorage.getItem(key));
      task.time = moment(task.time);
      this.tasks.push(task);
    }

    this.tasks = this.tasks.filter(
      (item) => item.time.format('YY M D') == date.format('YY M D')
    );
    return this.tasks;
  }

  saveToLocalStore(task: Task): void {
    localStorage.setItem(task.time.toString(), JSON.stringify(task));
  }
}
