import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap, map, of} from "rxjs";
import {loadStudent, loadStudentFailed, loadStudentSuccess} from "./student.actions";
import {StudentControllerService} from "../../services/student-controller.service";

@Injectable()
export class StudentEffects {
  _loadStudent = createEffect(() =>
    this.action$.pipe(
      ofType(loadStudent),
      exhaustMap((params) => {
        return this.service.fetchStudentData(params.id)
          .pipe(
            map((response: any) => {
                return loadStudentSuccess({student: response})
              }
            ),
            catchError((_error) => {
              return of(loadStudentFailed({errorMessage: _error.message}))
            })
          )
      })
    )
  )

  constructor(private action$: Actions, private service: StudentControllerService,) {
  }

}
