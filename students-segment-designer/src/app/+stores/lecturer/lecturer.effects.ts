import {Injectable} from "@angular/core";
import {LecturerInfoControllerService} from "../../services/lecturer-info-controller.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loadLecturer, loadLecturerFailed, loadLecturerSuccess} from "./lecturer-actions";
import {catchError, exhaustMap, map, of} from "rxjs";

@Injectable()
export class LecturerEffects {
  // _FetchLecturerInfo = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(loadLecturer),
  //     exhaustMap((action) => {
  //       return this.service.fetchData(action.entityNo).pipe(
  //         map((data) => {
  //           return loadLecturerSuccess({lecturer: data})
  //         }),
  //         catchError((_error) => {
  //           return of(loadLecturerFailed({errorMessage: 'ლექტორის ინფორმაცია მიუწვდომელია'}))
  //         })
  //       )
  //     }),
  //   )
  // )
  _loadLecturer = createEffect(() =>
    this.action$.pipe(
      ofType(loadLecturer),
      exhaustMap((params) => {
        return this.service.fetchData(params.entityNo)
          .pipe(
            map((response: any) => {
              localStorage.setItem('lecturer', response.id);
                return loadLecturerSuccess({lecturer: response})
              }
            ),
            catchError((_error) => {
              return of(loadLecturerFailed({errorMessage: _error.message}))
            })
          )
      })
    )
  )

  constructor(private action$: Actions, private service: LecturerInfoControllerService,) {
  }

}
