import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {Store} from "@ngrx/store";
import {getFilteredByDateEnrollmentInfo} from "../../+stores/enrollment/selector";
import {LoadingStatesEnum} from "../../models/loading-states.enum";
import {GenericLoadingComponent} from "../../shared/components/generic-loading/generic-loading.component";
import {NgxEchartsModule} from "ngx-echarts";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-subjects-segmentation',
  standalone: true,
  imports: [CommonModule, MatCardModule, GenericLoadingComponent, NgxEchartsModule],
  templateUrl: './subjects-segmentation.component.html',
  styleUrl: './subjects-segmentation.component.scss'
})
export class SubjectsSegmentationComponent implements OnInit, OnDestroy {
  @Output() selectedSubject: EventEmitter<string> = new EventEmitter();
  public loadingState: LoadingStatesEnum;
  public echartsOptions;
  public courses: {
    name: string,
    value: number
  }[];
  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.listenToEnrollmentsByDate();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public getSelectedSegment(event) {
    this.selectedSubject.emit(event.name)
  }

  private listenToEnrollmentsByDate() {
    this.store.select(getFilteredByDateEnrollmentInfo).pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      this.courses = [];
      this.loadingState = data.loadingState;
      if (data.enrollmentInfo) {
        data.enrollmentInfo.courses.forEach((el) => {
          this.courses.push({
            name: el.course,
            value: el.enrollments.length
          })
        })
        this.generateChart()
      }
    })
  }

  private generateChart() {
    this.echartsOptions = {
      title: {
        text: this.courses.reduce((sum, current) => sum += current.value, 0),
        left: 'center',
        top: 'center',
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'center',
        top: 'bottom',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          data: this.courses,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false
          },
        }
      ]
    }
  }
}
