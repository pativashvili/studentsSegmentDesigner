import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ProgressBarPipe} from "./pipe/progress-bar.pipe";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, ProgressBarPipe, MatProgressSpinnerModule, MatIcon],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss',
})
export class DashboardHeaderComponent implements OnInit {
  @Input() failedStudents: number;
  @Input() passedStudents: number;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cdr.detectChanges()
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['failedStudents']) {
  //     this.failedStudents = changes['failedStudents'].currentValue
  //   }
  //   if (changes['passedStudents']) {
  //     this.passedStudents = changes['passedStudents'].currentValue
  //   }
  // }
}
