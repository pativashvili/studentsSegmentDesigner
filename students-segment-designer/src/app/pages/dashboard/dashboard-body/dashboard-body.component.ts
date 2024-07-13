import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {NgxEchartsModule} from "ngx-echarts";
import {Store} from "@ngrx/store";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CommonModule} from "@angular/common";
import {GenericLoadingComponent} from "../../../shared/components/generic-loading/generic-loading.component";
import {Subject} from "rxjs";
import {SubjectsSegmentationComponent} from "../../../components/subjects-segmentation/subjects-segmentation.component";
import {filterEnrollmentByDate} from "../../../+stores/enrollment/erollment.actions";
import {ChosenSubjectChartComponent} from "../../../components/chosen-subject-chart/chosen-subject-chart.component";
import {Router} from "@angular/router";
import {SharedDateFiltersComponent} from "../../../shared/components/shared-date-filters/shared-date-filters.component";

@Component({
  selector: 'app-dashboard-body',
  standalone: true,
  imports: [MatCardModule,
    NgxEchartsModule,
    MatProgressSpinnerModule,
    CommonModule,
    GenericLoadingComponent,
    SubjectsSegmentationComponent,
    ChosenSubjectChartComponent, SharedDateFiltersComponent
  ],
  templateUrl: './dashboard-body.component.html',
  styleUrl: './dashboard-body.component.scss',
})
export class DashboardBodyComponent implements OnInit, OnDestroy {
  public startDate: string = null;
  public endDate = null;
  public subject: { title: string, id: number } = {
    title: null,
    id: null
  };
  public selectedSegment: string = null;
  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(private store$: Store, private router: Router) {
  }

  ngOnInit() {
    this.dispatchAction();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete()
  }

  public getStartDate(date: string): void {
    this.startDate = date;
    this.dispatchAction();
  }

  public getEndDate(date: string): void {
    this.endDate = date;
    this.dispatchAction();
  }

  public getSubject(subject: { title: string, id: number }): void {
    this.subject = subject;
    this.dispatchAction();
  }

  public dispatchAction() {
    this.store$.dispatch(filterEnrollmentByDate({
      startDate: this.startDate,
      endDate: this.endDate,
      courseId: this.subject.id
    }))
  }

  public getSelectedSubject(event) {
    this.selectedSegment = event;
    const queryParams = {
      // course: event,
      courseId: event,
      startDate: this.startDate ?? null,
      endDate: this.endDate ?? null,
    };
    this.router.navigate(['/subjects'], {queryParams}).then()
  }
}
