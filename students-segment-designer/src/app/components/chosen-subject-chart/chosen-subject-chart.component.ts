import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgxEchartsModule} from "ngx-echarts";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-chosen-subject-chart',
  standalone: true,
  imports: [
    NgxEchartsModule,
    CommonModule,
    MatCardModule
  ],
  templateUrl: './chosen-subject-chart.component.html',
  styleUrl: './chosen-subject-chart.component.scss'
})
export class ChosenSubjectChartComponent implements OnInit {
  @Input() selectedSubject: string;
  @Input() headerName: any;
  @Input() dateRange: string;
  @Input() public chartData = [];

  @Output() public onSelectedSegment: EventEmitter<{ grade: string }> = new EventEmitter<{ grade: string }>();

  public chartOptions;

  constructor() {
  }

  ngOnInit() {
    if (this.chartData?.length) {
      this.generateChart()
    }
  }

  ngOnChanges(changes): void {
    if (changes['chartData']) {
      this.chartData = changes['chartData'].currentValue;
      this.generateChart()
    }
  }

  public getSelectedSegment($event): void {
    const studentsGradeLetter = $event.data.name
    this.onSelectedSegment.emit(studentsGradeLetter)
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
