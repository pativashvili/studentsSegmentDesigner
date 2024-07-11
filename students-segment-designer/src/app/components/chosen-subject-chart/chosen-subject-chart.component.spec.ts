import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenSubjectChartComponent } from './chosen-subject-chart.component';

describe('ChosenSubjectChartComponent', () => {
  let component: ChosenSubjectChartComponent;
  let fixture: ComponentFixture<ChosenSubjectChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChosenSubjectChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChosenSubjectChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
