import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Subject, takeUntil} from "rxjs";
import {loadEnrollmentById} from "../../+stores/enrollment/erollment.actions";
import {getEnrollmentInfo} from "../../+stores/enrollment/selector";
import {LoadingStatesEnum} from "../../models/loading-states.enum";
import {NgxEchartsModule} from "ngx-echarts";
import {EnrollmentsModel} from "../../services/models/enrollments-model";
import {HistoryChartComponent} from "../../components/history-chart/history-chart.component";
import {CommonModule} from "@angular/common";
import {GenericLoadingComponent} from "../../shared/components/generic-loading/generic-loading.component";

interface GroupedEnrollment {
  enrollmentDate: string;
  passedCount: number;
  failedCount: number;
}

interface GroupedResult {
  [key: string]: GroupedEnrollment;
}

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [NgxEchartsModule, HistoryChartComponent, CommonModule, GenericLoadingComponent],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.scss'
})
export class ArchiveComponent implements OnInit {
  public chartOptions;
  public unsubscribe$: Subject<void> = new Subject<void>()
  public loadingState: LoadingStatesEnum;
  public transformedData;

  constructor(private store: Store) {

  }

  ngOnInit() {
    this.store.dispatch(loadEnrollmentById({minGrade: 0, maxGrade: 100}));
    this.store.select(getEnrollmentInfo).pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      this.loadingState = data.loadingState;
      this.transformedData = [];
      if (data.enrollmentInfo) {
        data.enrollmentInfo.courses.forEach((el) => {
          this.transformedData.push({
            name: el.course,
            data: this.groupEnrollmentsByDate(el.enrollments)
          })
        })
      }
    })
  }

  private groupEnrollmentsByDate(enrollments: EnrollmentsModel[]): GroupedEnrollment[] {
    const groupedResult: GroupedResult = {};

    enrollments.forEach(enrollment => {
      const date = enrollment.enrollmentDate;
      if (!groupedResult[date]) {
        groupedResult[date] = {enrollmentDate: date, passedCount: 0, failedCount: 0};
      }

      if (enrollment.grade > 51) {
        groupedResult[date].passedCount++;
      } else {
        groupedResult[date].failedCount++;
      }
    });
    return Object.values(groupedResult);
  }
}
