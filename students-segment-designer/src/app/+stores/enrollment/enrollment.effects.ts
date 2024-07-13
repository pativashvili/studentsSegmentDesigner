import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap, map, of} from "rxjs";
import {
  filterEnrollmentByDate,
  filterEnrollmentByDateFailed,
  filterEnrollmentByDateSuccess,
  loadEnrollmentById,
  loadEnrollmentByIdFailed,
  loadEnrollmentByIdSuccess
} from "./erollment.actions";
import {EnrollmentControllerService} from "../../services/enrollment-controller.service";
import {EnrollmentResponseModel} from "../../services/models/enrollment-response.model";

@Injectable()
export class EnrollmentEffects {
  _loadEnrollments$ = createEffect((): any =>
    this.action$.pipe(
      ofType(loadEnrollmentById),
      exhaustMap((params) => {
        const lecturerId = Number(localStorage.getItem('lecturer'))
        return this.service.fetchEndorsementsByLecturerId(lecturerId, null, null, params?.minGrade, params?.maxGrade)
          .pipe(
            map((response: EnrollmentResponseModel) => {
                return loadEnrollmentByIdSuccess({response: response})
              }
            ),
            catchError((_error) => {
              return of(loadEnrollmentByIdFailed())
            })
          )
      })
    )
  )

  _loadEnrollmentsByDate$ = createEffect((): any =>
    this.action$.pipe(
      ofType(filterEnrollmentByDate),
      exhaustMap((params: {
        startDate?: string,
        endDate?: string,
        minGrade?: number,
        maxGrade?: number,
        courseId?: number
      }) => {
        const lecturerId = Number(localStorage.getItem('lecturer'))
        return this.service.fetchEndorsementsByLecturerId(lecturerId, params?.['startDate'], params?.['endDate'], params?.['minGrade'], params?.['maxGrade'], params?.['courseId'])
          .pipe(
            map((response: EnrollmentResponseModel) => {
                return filterEnrollmentByDateSuccess({response: response})
              }
            ),
            catchError((_error) => {
              return of(filterEnrollmentByDateFailed())
            })
          )
      })
    )
  )

  constructor(private action$: Actions,
              private service: EnrollmentControllerService,) {
  }

}
