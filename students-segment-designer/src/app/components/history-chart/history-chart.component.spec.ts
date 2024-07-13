import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxEchartsModule } from 'ngx-echarts';
import { HistoryChartComponent } from './history-chart.component';
import { appConfig } from '../../app.config';
import { ChangeDetectorRef } from '@angular/core';

describe('HistoryChartComponent', () => {
  let component: HistoryChartComponent;
  let fixture: ComponentFixture<HistoryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryChartComponent],
      providers: [NgxEchartsModule, ...appConfig.providers, ChangeDetectorRef],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
