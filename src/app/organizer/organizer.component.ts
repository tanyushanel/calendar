import { Task, TaskService } from './../task.service';
import { BehaviorSubject } from 'rxjs';
import { DateService } from './../date.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss'],
})
export class OrganizerComponent implements OnInit {
  task: Task = {
    title: '',
    date: this.dateService.date,
  };

  form: FormGroup;
  title: FormControl;
  tasks: Task[] = [];
  constructor(
    private dateService: DateService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.title = new FormControl('', Validators.required);
    this.form = new FormGroup({
      title: this.title,
    });
  }

  toAddTaskSubmit(): void {
    const task = new Task();
    task.title = this.title.value;
    task.date = this.dateService.date;
    this.tasks.push(task);
    this.form.reset();
  }

  toShowTasks() {}
}
