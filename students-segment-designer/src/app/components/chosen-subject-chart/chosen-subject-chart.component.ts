import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {NgxEchartsModule} from "ngx-echarts";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-chosen-subject-chart',
  standalone: true,
  imports: [NgxEchartsModule, CommonModule, MatCardModule],
  templateUrl: './chosen-subject-chart.component.html',
  styleUrl: './chosen-subject-chart.component.scss'
})
export class ChosenSubjectChartComponent implements OnInit {
  @Input() selectedSubject: string;
  @Input() headerName: any;
  public chartOptions;
  @Input() public chartData = [];
  public startDate: string;
  public endDate: string;

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.startDate = this.route.snapshot.queryParamMap.get('startDate');
    this.endDate = this.route.snapshot.queryParamMap.get('endDate');
    if (this.chartData?.length) {
      this.generateChart()
    }
  }

  ngOnChanges(changes) {
    if (changes['chartData']) {
      this.chartData = changes['chartData'].currentValue;
      this.generateChart()
    }
  }

  public getSelectedSegment($event) {
    const studentsGradeLetter = $event.data.name
    const selectedSubject = this.headerName;
    let queryParams;

    if (this.startDate && this.endDate) {
      queryParams = {
        subject: selectedSubject,
        grade: studentsGradeLetter,
        startDate: this.startDate,
        endDate: this.endDate
      }
    } else {
      queryParams = {
        subject: selectedSubject,
        grade: studentsGradeLetter,
      }
    }
    this.router.navigate(['/students'], {queryParams}).then()
  }


  private generateChart() {
    this.chartOptions = {
      title: {
        text: this.chartData?.reduce((sum, current) => sum += current.value, 0),
        left: 'center',
        top: 'center',
      },
      legend: {
        bottom: 'bottom',
        tooltip: {
          trigger: 'item'
        }
      },
      toolbox: {
        show: true,
        feature: {
          mark: {show: true},
          dataView: {show: true, readOnly: false},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'სტუდენტების კატეგორია:',
          type: 'pie',
          radius: [50, 250],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: this.chartData?.sort((a, b) => a.name.localeCompare(b.name))
        }
      ]
    };
  }
}
