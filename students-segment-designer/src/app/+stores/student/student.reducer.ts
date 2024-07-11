import {createReducer, on} from "@ngrx/store";
import {LoadingStatesEnum} from "../../models/loading-states.enum";
import {studentState} from "./student.state";
import {loadStudent, loadStudentFailed, loadStudentSuccess} from "./student.actions";
import {StudentInfoModel} from "./student-info.model";

const _StudentReducer = createReducer(studentState,
  on(loadStudent, (state, action) => {
    return {
      ...state,
      loadingState: LoadingStatesEnum.LOADING
    }
  }),
  on(loadStudentSuccess, (state, action) => {
    return {
      ...state,
      studentInfo: action.student as StudentInfoModel,
      loadingState: LoadingStatesEnum.LOADED
    }
  }),
  on(loadStudentFailed, (state, action) => {
    return {
      ...state,
      studentInfo: null,
      loadingState: LoadingStatesEnum.ERROR
    }
  }),
)

export function StudentReducer(state: {
  studentInfo: StudentInfoModel,
  loadingState: LoadingStatesEnum
}, action: any) {
  return _StudentReducer(state, action)
}
