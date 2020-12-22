import { Task, TaskService } from './../task.service';
import { BehaviorSubject } from 'rxjs';
import { DateService } from './../date.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss'],
})
export class OrganizerComponent implements OnInit {
  date: moment.Moment;
  form: FormGroup;
  titleControl: FormControl;
  dateControl: FormControl;
  tasks: Task[] = this.taskService.tasks;

  constructor(
    private dateService: DateService,
    private taskService: TaskService
  ) {
    this.date = this.dateService.date.value;
  }

  ngOnInit(): void {
    this.titleControl = new FormControl('', Validators.required);
    this.dateControl = new FormControl('', Validators.required);
    this.form = new FormGroup({
      title: this.titleControl,
      time: this.dateControl,
    });
    this.dateService.date.subscribe((nextValue) => this.onDayChange(nextValue));
  }

  onDayChange(day: moment.Moment): void {
    this.tasks = this.taskService.getTasksByDate(day);
  }

  toAddTaskSubmit(): void {
    const selectedTime = this.dateControl.value;

    const task = new Task();
    task.title = this.titleControl.value;
    task.time = moment(
      this.dateService.date.value.format('MMMM DD YYYY') + ' ' + selectedTime
    );
    this.taskService.saveTask(task);
    this.form.reset();
  }

  toDelTaskSubmit(task: Task) {
    task.isDeleted = true;
    this.taskService.deleteTask(task);
  }
}
