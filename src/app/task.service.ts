import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class Task {
  id?: string;
  title: string;
  date?: BehaviorSubject<moment.Moment>;
  done?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public url = 'https://angular-calendar-5f5eb.firebaseio.com/tasks';
  constructor(private http: HttpClient) {}
  toShowTasks(day) {}
  createTask(task: Task): void {
    this.http.post<any>(`${this.url}/${task.date}.json`, task).pipe(
      map((res) => {
        console.log(res);
        return res;
      })
    );
  }
}
