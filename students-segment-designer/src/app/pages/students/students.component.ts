import {Component, OnInit} from '@angular/core';
import {filterEnrollmentByDate, loadEnrollmentById} from "../../+stores/enrollment/erollment.actions";
import {ActivatedRoute, Params} from "@angular/router";
import {Store} from "@ngrx/store";
import {Subject, takeUntil} from "rxjs";
import {getEnrollmentInfo, getFilteredByDateEnrollmentInfo} from "../../+stores/enrollment/selector";
import {EnrollmentsModel} from "../../services/models/enrollments-model";
import {ChoseStudentsTableComponent} from "../../components/chose-students-table/chose-students-table.component";
import {CommonModule} from "@angular/common";
import {MatExpansionModule} from "@angular/material/expansion";
import {FiltersListConst} from "../../shared/constants/filters-list.const";

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    ChoseStudentsTableComponent,
    CommonModule,
    MatExpansionModule
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {
  public queryParams: Params;
  public dataSource: EnrollmentsModel[];
  public dataSources: any[];
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
        if (this.queryParams['grade']) {
          const selectedGrade = this.queryParams['grade'];
          FiltersListConst.forEach((el) => el.selected = false)
          this.fetchEnrollmentInfo(FiltersListConst.find((el) => el.name === selectedGrade));
        }
        this.listenEnrollmentsByDate();
      } else {
        this.fetchAllEnrollmentInfo()
        this.listenEnrollments()
      }
    });
  }

  public filterChosenTable($event) {
    this.fetchEnrollmentInfo($event)
  }

  public filterAllTables($event) {
    this.fetchAllEnrollmentInfo($event)
  }

  private listenEnrollmentsByDate() {
    this.store$.select(getFilteredByDateEnrollmentInfo).pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe((data) => {
      if (data.enrollmentInfo) {
        const course = data.enrollmentInfo.courses.find(el => el.course === this.queryParams['subject']);
        if (course) {
          this.dataSource = course.enrollments
        }
      }
    })
  }

  private listenEnrollments() {
    this.store$.select(getEnrollmentInfo).pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe((data) => {
      this.dataSources = [];
      if (data.enrollmentInfo) {
        const courses = data.enrollmentInfo.courses;
        courses.forEach((el) => {
          this.dataSources.push({
            name: el.course,
            dataSource: el.enrollments
          })
        })
      }
    })
  }

  private fetchEnrollmentInfo(selectedFilter?: any) {
    if (!selectedFilter) {
      this.store$.dispatch(filterEnrollmentByDate({startDate: this.startDate, endDate: this.endDate,}))
    }
    if (selectedFilter) {
      this.store$.dispatch(filterEnrollmentByDate({
        startDate: this.startDate,
        endDate: this.endDate,
        minGrade: selectedFilter.minValue,
        maxGrade: selectedFilter.maxValue
      }))
    }
  }

  private fetchAllEnrollmentInfo(selectedFilter?: any) {
    if (!selectedFilter) {
      this.store$.dispatch(loadEnrollmentById({minGrade: selectedFilter?.minValue, maxGrade: selectedFilter?.maxValue}))
    }
    if (selectedFilter) {
      this.store$.dispatch(loadEnrollmentById({
        minGrade: selectedFilter.minValue,
        maxGrade: selectedFilter.maxValue
      }))
    }
  }
}
