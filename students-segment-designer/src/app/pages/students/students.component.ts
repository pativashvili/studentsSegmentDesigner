import { Component, OnInit } from '@angular/core';
import { filterEnrollmentByDate } from '../../+stores/enrollment/erollment.actions';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { getFilteredByDateEnrollmentInfo } from '../../+stores/enrollment/selector';
import { EnrollmentsModel } from '../../services/models/enrollments-model';
import { ChoseStudentsTableComponent } from '../../components/chose-students-table/chose-students-table.component';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { FiltersListConst } from '../../shared/constants/filters-list.const';
import { LoadingStatesEnum } from '../../models/loading-states.enum';
import { GenericLoadingComponent } from '../../shared/components/generic-loading/generic-loading.component';
import { SharedGradeFiltersComponent } from '../../shared/components/shared-grade-filters/shared-grade-filters.component';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    ChoseStudentsTableComponent,
    CommonModule,
    MatExpansionModule,
    GenericLoadingComponent,
    SharedGradeFiltersComponent,
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit {
  public queryParams: Params;
  public dataSource: EnrollmentsModel[];
  public dataSources: {
    name: string;
    dataSource: EnrollmentsModel[];
  }[];
  public grade: string;
  public minGrade: number;
  public maxGrade: number;
  public courseId: number;
  public loadingState: LoadingStatesEnum;
  private unsubscribe$: Subject<void> = new Subject();
  public startDate: string;
  public endDate: string;

  constructor(private route: ActivatedRoute, private store$: Store) {}

  ngOnInit() {
    this.getQueryParams();
    this.fetchEnrollmentInfo();
    this.listenEnrollments();
  }

  public filterChosenTable($event): void {
    this.minGrade = $event.minGrade;
    this.maxGrade = $event.maxGrade;
    this.fetchEnrollmentInfo();
  }

  private getQueryParams(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.queryParams = queryParams;
      this.startDate = this.startDate = this.queryParams['startDate'];
      this.endDate = this.queryParams['endDate'];
      this.grade = this.queryParams['grade'];
      this.courseId = this.queryParams['courseId'];
      const gradeToFilter = FiltersListConst.find(
        (el) => el.name === this.grade
      );
      this.minGrade = gradeToFilter?.minValue;
      this.maxGrade = gradeToFilter?.maxValue;
    });
  }

  private listenEnrollments(): void {
    this.store$
      .select(getFilteredByDateEnrollmentInfo)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.loadingState = data.loadingState;
        this.dataSources = [];
        if (data.enrollmentInfo) {
          const courses = data.enrollmentInfo.courses;
          courses.forEach((el) => {
            this.dataSources.push({
              name: el.course,
              dataSource: el.enrollments,
            });
          });
        }
      });
  }

  private fetchEnrollmentInfo(): void {
    this.store$.dispatch(
      filterEnrollmentByDate({
        startDate: this.startDate,
        endDate: this.endDate,
        minGrade: this.minGrade,
        maxGrade: this.maxGrade,
        courseId: this.courseId,
      })
    );
  }
}
