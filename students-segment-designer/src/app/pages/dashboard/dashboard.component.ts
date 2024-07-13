import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {DashboardHeaderComponent} from './dashboard-header/dashboard-header.component';
import {DashboardBodyComponent} from './dashboard-body/dashboard-body.component';
import {Store} from "@ngrx/store";
import {loadEnrollmentById} from "../../+stores/enrollment/erollment.actions";
import {getEnrollmentInfo} from "../../+stores/enrollment/selector";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [
    MatCardModule,
    DashboardHeaderComponent,
    DashboardBodyComponent,
  ],
})
export class DashboardComponent implements OnInit {
  public passedStudents: number;
  public failedStudents: number;
  public averageGrade: number;
  public maxGrade: number;
  public minGrade: number;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(private authService: AuthService, private router: Router, private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(loadEnrollmentById({minGrade: 0, maxGrade: 100}));
    this.store.select(getEnrollmentInfo).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((enrollmentState) => {
      if (enrollmentState.enrollmentInfo) {
        this.failedStudents = enrollmentState.enrollmentInfo.failCount;
        this.passedStudents = enrollmentState.enrollmentInfo.passCount;
        this.averageGrade = Math.floor(enrollmentState.enrollmentInfo.averageGrade);
        this.maxGrade = enrollmentState.enrollmentInfo.maxGrade;
        this.minGrade = enrollmentState.enrollmentInfo.minGrade;
      }
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
