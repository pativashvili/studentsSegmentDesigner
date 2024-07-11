import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {ChosenSubjectChartComponent} from "../../components/chosen-subject-chart/chosen-subject-chart.component";
import {ActivatedRoute, Params} from "@angular/router";
import {CommonModule, NgIf} from "@angular/common";
import {Store} from "@ngrx/store";
import {getEnrollmentInfo, getFilteredByDateEnrollmentInfo} from "../../+stores/enrollment/selector";
import {Subject, takeUntil} from "rxjs";
import {filterEnrollmentByDate, loadEnrollmentById} from "../../+stores/enrollment/erollment.actions";
import {LoadingStatesEnum} from "../../models/loading-states.enum";
import {GenericLoadingComponent} from "../../shared/components/generic-loading/generic-loading.component";
import {MatExpansionModule} from "@angular/material/expansion";

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [MatCardModule, ChosenSubjectChartComponent, CommonModule, NgIf, GenericLoadingComponent, MatExpansionModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent implements OnInit, OnDestroy {
  public queryParams: Params;
  public chartDataArray: any[];
  public chartData;
  public loadingState: LoadingStatesEnum;
  private unsubscribe$: Subject<void> = new Subject();
  private startDate: string;
  private endDate: string;

  constructor(private route: ActivatedRoute, private store$: Store) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
      if (this.queryParams['startDate'] && this.queryParams['endDate']) {
        this.startDate = this.queryParams['startDate'];
        this.endDate = this.queryParams['endDate'];
        this.fetchEnrollmentInfo();
        this.listenEnrollmentsByDate();
      } else {
        this.store$.dispatch(loadEnrollmentById({minGrade: 0, maxGrade: 100}))
        this.listenEnrollments()
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private listenEnrollments() {
    this.store$.select(getEnrollmentInfo).pipe(
      takeUntil(this.unsubscribe$),
      // Check if data exists after dispatching action
    ).subscribe((data) => {
      this.loadingState = data.loadingState;
      this.chartDataArray = [];
      if (data.enrollmentInfo) {

        data.enrollmentInfo.courses.forEach((element) => {
          const students = element.enrollments;
          this.chartDataArray.push({data: this.calculateGradeCounts(students), name: element.course});
        })
      }
    })
  }

  private listenEnrollmentsByDate() {
    this.store$.select(getFilteredByDateEnrollmentInfo).pipe(
      takeUntil(this.unsubscribe$),
      // Check if data exists after dispatching action
    ).subscribe((data) => {
      this.loadingState = data.loadingState
      if (data.enrollmentInfo) {
        const course = data.enrollmentInfo.courses.find(el => el.course === this.queryParams['subject']);
        if (course) {
          const students = course.enrollments; // Assuming 'enrollments' holds student data
          this.chartData = this.calculateGradeCounts(students);
          console.log(this.chartData)
        }
      }
    })
  }

  private calculateGradeCounts(students: any[]): any[] {
    const gradeCounts = students.reduce((acc, student) => {
      const {gradeLetter} = student;
      if (!acc[gradeLetter]) {
        acc[gradeLetter] = 0;
      }
      acc[gradeLetter]++;
      return acc;
    }, {});

    // Convert to array of objects with 'name' and 'value' properties
    return Object.keys(gradeCounts).map(gradeLetter => ({
      name: gradeLetter,
      value: gradeCounts[gradeLetter]
    }));
  }

  private fetchEnrollmentInfo() {
    this.store$.dispatch(filterEnrollmentByDate({startDate: this.startDate, endDate: this.endDate}))
  }
}
