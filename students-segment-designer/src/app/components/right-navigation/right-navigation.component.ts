import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  NgxEchartsDirective,
  NgxEchartsModule,
  provideEcharts,
} from 'ngx-echarts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-right-navigation',
  standalone: true,
  imports: [MatCardModule, NgxEchartsModule],
  templateUrl: './right-navigation.component.html',
  styleUrl: './right-navigation.component.scss',
})
export class RightNavigationComponent {
  chartOption: EChartsOption = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'ალგორითმები' },
          { value: 735, name: 'კალკულუსი' },
          { value: 580, name: 'გეომეტრია' },
        ],
      },
    ],
  };
}
