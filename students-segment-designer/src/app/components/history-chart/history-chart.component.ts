import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history-chart',
  standalone: true,
  imports: [NgxEchartsModule],
  templateUrl: './history-chart.component.html',
  styleUrl: './history-chart.component.scss',
  providers: [DatePipe],
})
export class HistoryChartComponent implements AfterViewInit {
  public chartOptions;
  @Input() history: {
    name: string;
    data: {
      enrollmentDate: string;
      passedCount: number;
      failedCount: number;
    }[];
  };

  constructor(private cdk: ChangeDetectorRef, private datePipe: DatePipe) {}

  ngAfterViewInit() {
    this.initialiseChart();
    this.cdk.detectChanges();
  }

  private initialiseChart(): void {
    this.chartOptions = {
      title: {
        text: this.history?.name,
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      legend: {
        data: ['ჩაბარებული', 'ჩაჭრილი'],
        left: 'left',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: this.history?.data?.map((item) =>
          this.datePipe.transform(item?.enrollmentDate)
        ),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'ჩაბარებული',
          type: 'bar',
          data: this.history?.data.map((item) => item?.passedCount),
          itemStyle: {
            color: 'green',
          },
        },
        {
          name: 'ჩაჭრილი',
          type: 'bar',
          data: this.history?.data.map((item) => item?.failedCount),
          itemStyle: {
            color: 'red',
          },
        },
      ],
      animationDuration: 0,
      animationDurationUpdate: 3000,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear',
    };
  }
}
