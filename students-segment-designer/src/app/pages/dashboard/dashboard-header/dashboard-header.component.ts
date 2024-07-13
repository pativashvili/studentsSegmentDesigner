import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ProgressBarPipe} from "./pipe/progress-bar.pipe";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIcon} from "@angular/material/icon";
import {CommonModule, NgClass} from "@angular/common";

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, ProgressBarPipe, MatProgressSpinnerModule, MatIcon, NgClass, CommonModule],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss',
})
export class DashboardHeaderComponent implements OnInit {
  @Input() failedStudents: number;
  @Input() passedStudents: number;

  @Input() public averageGrade: number;
  @Input() public maxGrade: number;
  @Input() public minGrade: number;
  @Input() public courses: string[];

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cdr.detectChanges()
  }
}
