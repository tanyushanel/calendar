import { DateService } from './date.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class Task {
  id?: string;
  title: string;
  time?: moment.Moment;
  // date?: moment.Moment;
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

  saveTask(task: Task): void {
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
    this.tasks.filter((item) => item !== task);
  }

  getTasksByDate(date: moment.Moment): Task[] {
    return this.tasks;
  }

  saveToLocalStore(task: Task): void {
    localStorage.setItem(task.time.toString(), JSON.stringify(task));
  }
}
