import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadStudent } from '../../+stores/student/student.actions';
import { getStudentInfo } from '../../+stores/student/selector';
import { Subject, takeUntil } from 'rxjs';
import { LoadingStatesEnum } from '../../models/loading-states.enum';
import { GenericLoadingComponent } from '../../shared/components/generic-loading/generic-loading.component';
import { CommonModule } from '@angular/common';
import { StudentInfoModel } from '../../+stores/student/student-info.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EndorseDialogComponent } from '../../components/endorse-dialog/endorse-dialog.component';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [
    GenericLoadingComponent,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.scss',
})
export class StudentProfileComponent implements OnInit, OnDestroy {
  public studentId: number;
  public student: StudentInfoModel;
  public loadingState: LoadingStatesEnum;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.studentId = params['studentId'];
      this.store.dispatch(loadStudent({ id: this.studentId }));
    });
    this.listenToStudentState();
  }

  openEndorseModal(): void {
    this.matDialog.open(EndorseDialogComponent, {
      minWidth: '60%',
      minHeight: '30%',
      data: {
        studentId: this.studentId,
      },
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private listenToStudentState(): void {
    this.store
      .select(getStudentInfo)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.loadingState = data.loadingState;
        if (data.studentInfo) {
          this.student = data.studentInfo;
        }
      });
  }
}
