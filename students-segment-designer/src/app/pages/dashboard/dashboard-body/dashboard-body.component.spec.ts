import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBodyComponent } from './dashboard-body.component';
import { appConfig } from '../../../app.config';

describe('DashboardBodyComponent', () => {
  let component: DashboardBodyComponent;
  let fixture: ComponentFixture<DashboardBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardBodyComponent],
      providers: [...appConfig.providers],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
