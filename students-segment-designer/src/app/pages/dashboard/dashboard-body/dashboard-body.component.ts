import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {NgxEchartsModule} from "ngx-echarts";
import {Store} from "@ngrx/store";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CommonModule} from "@angular/common";
import {GenericLoadingComponent} from "../../../shared/components/generic-loading/generic-loading.component";
import {Subject} from "rxjs";
import {SharedFiltersComponent} from "../../../shared/components/shared-filters/shared-filters.component";
import {SubjectsSegmentationComponent} from "../../../components/subjects-segmentation/subjects-segmentation.component";
import {filterEnrollmentByDate} from "../../../+stores/enrollment/erollment.actions";
import {ChosenSubjectChartComponent} from "../../../components/chosen-subject-chart/chosen-subject-chart.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-body',
  standalone: true,
  imports: [MatCardModule,
    NgxEchartsModule,
    MatProgressSpinnerModule,
    CommonModule,
    GenericLoadingComponent,
    SharedFiltersComponent,
    SubjectsSegmentationComponent,
    ChosenSubjectChartComponent
  ],
  templateUrl: './dashboard-body.component.html',
  styleUrl: './dashboard-body.component.scss',
})
export class DashboardBodyComponent implements OnInit, OnDestroy {
  public selectedSegment: string = null;
  private selectedDate;
  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(private store$: Store, private router: Router) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete()
  }

  public getSelectedDate(event) {
    const date = new Date(event);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-based index
    const selectedDate = this.calculateDates(year, month);
    this.selectedDate = selectedDate;
    this.selectedSegment = null;
    this.store$.dispatch(filterEnrollmentByDate({startDate: selectedDate.startDate, endDate: selectedDate.endDate}))
  }

  calculateDates(year: number, month: number,) {
    let startDate;
    let endDate;
    if (month >= 3 && month < 9) {
      startDate = `${year}-02-16`;
      endDate = `${year}-09-16`;
    } else {
      if (month >= 9) {
        startDate = `${year}-09-16`;
        endDate = `${year + 1}-03-16`;
      }
    }

    return {
      startDate: startDate,
      endDate: endDate
    }
  }

  public getSelectedSubject(event) {
    this.selectedSegment = event;
    const queryParams = {
      subject: event,
      startDate: this.selectedDate.startDate,
      endDate: this.selectedDate.endDate,
    };
    this.router.navigate(['/subjects'], {queryParams}).then()
  }

}
