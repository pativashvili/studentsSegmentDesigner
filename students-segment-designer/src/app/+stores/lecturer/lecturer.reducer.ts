import {createReducer, on} from "@ngrx/store";
import {lecturerState} from "./lecturer.state";
import {loadLecturer, loadLecturerFailed, loadLecturerSuccess} from "./lecturer-actions";
import {LoadingStatesEnum} from "../../models/loading-states.enum";
import {LecturerInfoModel} from "./lecturer-info.model";

const _LecturerReducer = createReducer(lecturerState,
  on(loadLecturer, (state, action) => {
    return {
      ...state,
      loadingState: LoadingStatesEnum.LOADING
    }
  }),
  on(loadLecturerSuccess, (state, action) => {
    return {
      ...state,
      lecturerInfo: action.lecturer as LecturerInfoModel,
      loadingState: LoadingStatesEnum.LOADED
    }
  }),
  on(loadLecturerFailed, (state, action) => {
    return {
      ...state,
      lecturerInfo: null,
      loadingState: LoadingStatesEnum.ERROR
    }
  }),
)

export function LecturerReducer(state: {
  lecturerInfo: LecturerInfoModel,
  loadingState: LoadingStatesEnum
}, action: any) {
  return _LecturerReducer(state, action)
}
