import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule, MatDateRangePicker} from "@angular/material/datepicker";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, DatePipe, JsonPipe} from "@angular/common";
import {provideNativeDateAdapter} from "@angular/material/core";
import {Store} from "@ngrx/store";
import {Subject, takeUntil} from "rxjs";
import {LoadingStatesEnum} from "../../../models/loading-states.enum";
import {GenericLoadingComponent} from "../generic-loading/generic-loading.component";
import {CoursesControllerService} from "../../../services/courses-controller.service";
import {MatSelectModule} from "@angular/material/select";

interface Course {
  id: number,
  isRequired: boolean,
  title: string,
  facultyId: number
}

@Component({
  selector: 'app-shared-date-filters',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    JsonPipe,
    CommonModule,
    GenericLoadingComponent,
    MatDateRangePicker,
    FormsModule,
    MatSelectModule
  ],
  providers: [provideNativeDateAdapter(), DatePipe],
  templateUrl: './shared-date-filters.component.html',
  styleUrl: './shared-date-filters.component.scss'
})

export class SharedDateFiltersComponent implements OnInit, OnDestroy {
  @Output() onStartDate: EventEmitter<string> = new EventEmitter<string>();
  @Output() onEndDate: EventEmitter<string> = new EventEmitter<string>();
  @Output() onSubject: EventEmitter<{ title: string, id: number }> = new EventEmitter();
  public startControl = new FormControl<Date | null>(null);
  public endControl = new FormControl<Date | null>(null);
  public coursesControl = new FormControl<Course | null>(null)
  readonly range = new FormGroup({
    start: this.startControl,
    end: this.endControl,
    courses: this.coursesControl,
  });
  public minDate;
  public maxDate = new Date();
  public loadingState: LoadingStatesEnum;
  public courses: Course[];
  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(private store: Store, private datePipe: DatePipe, private coursesControllerService: CoursesControllerService) {
  }

  ngOnInit() {
    this.coursesControllerService.fetchCoursesByLecturerId(Number(localStorage.getItem('lecturer'))).subscribe((data) => {
      this.courses = [{
        isRequired: false,
        facultyId: null,
        title: 'ყველა',
        id: null
      }, ...data];
    })
    this.listenToFormChanges();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete()
  }


  private listenToFormChanges() {
    this.startControl.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      if (value) {
        this.onStartDate.emit(this.datePipe.transform(value, 'yyyy-MM-dd HH:mm:ss'));
        this.onEndDate.emit(null);
      }
    })
    this.endControl.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      if (value) {
        this.onEndDate.emit(this.datePipe.transform(value, 'yyyy-MM-dd HH:mm:ss'))
      }
    })
    this.coursesControl.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      if (value) {
        this.onSubject.emit({
          title: value.title,
          id: value.id
        })
      }
    })
  }
}
