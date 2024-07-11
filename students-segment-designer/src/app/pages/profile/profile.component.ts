import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {Store} from "@ngrx/store";
import {getLecturerInfo} from "../../+stores/lecturer/selector";
import {AsyncPipe, CommonModule} from "@angular/common";
import {GenericLoadingComponent} from "../../shared/components/generic-loading/generic-loading.component";
import {MatColumnDef, MatTableModule} from "@angular/material/table";
import {Subject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, AsyncPipe, CommonModule, GenericLoadingComponent, MatTableModule, MatColumnDef],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  inputColumns = ['სახელი', 'გვარი', 'ასაკი', 'დაბადაბის თარიღი', 'ხარისხი', 'ფაკულტეტი', 'პირადი ნომერი', 'გვარი', 'ხარისხი'];
  private unsubscribe$: Subject<void> = new Subject<void>();
  public currentUser$ = this.store$.select((getLecturerInfo)).pipe(takeUntil(this.unsubscribe$), tap((el) => console.log('EL', el)));

  constructor(private store$: Store) {
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
