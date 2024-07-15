import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChosenSubjectChartComponent } from '../../components/chosen-subject-chart/chosen-subject-chart.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { getFilteredByDateEnrollmentInfo } from '../../+stores/enrollment/selector';
import { Subject, takeUntil } from 'rxjs';
import { filterEnrollmentByDate } from '../../+stores/enrollment/erollment.actions';
import { LoadingStatesEnum } from '../../models/loading-states.enum';
import { GenericLoadingComponent } from '../../shared/components/generic-loading/generic-loading.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CoursesControllerService } from '../../services/courses-controller.service';
@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [
    MatCardModule,
    ChosenSubjectChartComponent,
    CommonModule,
    NgIf,
    GenericLoadingComponent,
    MatExpansionModule,
  ],
  templateUrl: './subjects.component.html',
  providers: [DatePipe],
  styleUrl: './subjects.component.scss',
})
export class SubjectsComponent implements OnInit, OnDestroy {
  public queryParams: Params;
  public chartDataArray: any[];
  public courseId: number;
  public dateRange: string;
  public loadingState: LoadingStatesEnum;
  private unsubscribe$: Subject<void> = new Subject();
  public startDate: string;
  public endDate: string;
  public courses$ = this.coursesControllerService.fetchCoursesByLecturerId(
    Number(localStorage.getItem('lecturer'))
  );

  constructor(
    private route: ActivatedRoute,
    private store$: Store,
    private router: Router,
    private coursesControllerService: CoursesControllerService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.queryParams = params;
      this.startDate = this.queryParams['startDate'];
      this.endDate = this.queryParams['endDate'];
      this.courseId = this.queryParams['courseId'];
      this.fetchEnrollmentInfo();
    });
    this.listenEnrollments();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public navigateToStudents($event): void {
    this.router
      .navigate(['/students'], {
        queryParams: {
          startDate: this.startDate,
          endDate: this.endDate,
          courseId: this.courseId,
          grade: $event,
        },
      })
      .then();
  }

  private listenEnrollments(): void {
    this.store$
      .select(getFilteredByDateEnrollmentInfo)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.loadingState = data.loadingState;
        this.chartDataArray = [];
        if (data.enrollmentInfo) {
          data.enrollmentInfo.courses.forEach((element) => {
            const students = element.enrollments;
            this.chartDataArray.push({
              name: element.course,
              data: this.calculateGradeCounts(students),
            });
          });
        }
      });
  }

  private calculateGradeCounts(students: any[]): any[] {
    const gradeCounts = students.reduce((acc, student) => {
      const { gradeLetter } = student;
      if (!acc[gradeLetter]) {
        acc[gradeLetter] = 0;
      }
      acc[gradeLetter]++;
      return acc;
    }, {});

    // Convert to array of objects with 'name' and 'value' properties
    return Object.keys(gradeCounts).map((gradeLetter) => ({
      name: gradeLetter,
      value: gradeCounts[gradeLetter],
    }));
  }

  private fetchEnrollmentInfo(): void {
    this.store$.dispatch(
      filterEnrollmentByDate({
        startDate: this.startDate,
        endDate: this.endDate,
        courseId: this.courseId,
      })
    );
  }
}
