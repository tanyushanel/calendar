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
  tasks: Task[] = [];

  task: Task = {
    title: '',
    date: this.dateService.date,
    done: false,
  };

  form: FormGroup;
  title: FormControl;
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
    this.task.title = this.title.value;
    this.tasks.push(this.task);
    console.log(this.task.title, this.task, this.tasks);
  }

  toShowTasks() {}
}
