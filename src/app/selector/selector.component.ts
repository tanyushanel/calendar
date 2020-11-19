import { DateService } from './../date.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
})
export class SelectorComponent implements OnInit {
  date = this.dateService.date;

  constructor(public dateService: DateService) {}

  ngOnInit(): void {}

  go(dir: number): void {
    this.dateService.goToMonth(dir);
  }
}
