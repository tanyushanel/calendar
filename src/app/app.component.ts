import { DateService } from './date.service';
import { BehaviorSubject } from 'rxjs';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'calendar';

  constructor(private dateService: DateService) {}

  goToSelected(): void {
    this.dateService.goToDay(this.dateService.date.value);
  }
}
