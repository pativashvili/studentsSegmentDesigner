import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {DashboardHeaderComponent} from './dashboard-header/dashboard-header.component';
import {DashboardBodyComponent} from './dashboard-body/dashboard-body.component';
import {DashboardFooterComponent} from './dashboard-footer/dashboard-footer.component';
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
    DashboardFooterComponent,
  ],
})
export class DashboardComponent implements OnInit {
  public passedStudents: number;
  public failedStudents: number;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(private authService: AuthService, private router: Router, private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(loadEnrollmentById({minGrade: 0, maxGrade: 100}));
    this.store.select(getEnrollmentInfo).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((enrollmentState) => {
      if (enrollmentState.enrollmentInfo) {
        this.passedStudents = enrollmentState.enrollmentInfo.passCount;
        this.failedStudents = enrollmentState.enrollmentInfo.failCount;
      }
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
