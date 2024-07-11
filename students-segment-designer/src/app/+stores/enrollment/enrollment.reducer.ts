import {createReducer, on} from "@ngrx/store";
import {LoadingStatesEnum} from "../../models/loading-states.enum";
import {EnrollmentState} from "./enrollment.state";
import {
  filterEnrollmentByDate, filterEnrollmentByDateFailed, filterEnrollmentByDateSuccess,
  loadEnrollmentById,
  loadEnrollmentByIdFailed,
  loadEnrollmentByIdSuccess
} from "./erollment.actions";
import {EnrollmentResponseModel} from "../../services/models/enrollment-response.model";

const _EnrolmentReducer = createReducer(EnrollmentState,
  on(loadEnrollmentById, (state, action) => {
    return {
      ...state,
      loadingState: LoadingStatesEnum.LOADING
    }
  }),
  on(loadEnrollmentByIdSuccess, (state, action) => {
    return {
      ...state,
      enrollmentInfo: action.response,
      loadingState: LoadingStatesEnum.LOADED
    }
  }),
  on(loadEnrollmentByIdFailed, (state, action) => {
    return {
      ...state,
      enrollmentInfo: null,
      loadingState: LoadingStatesEnum.ERROR
    }
  }),
//----------------------
  on(filterEnrollmentByDate, (state, action) => {
    return {
      ...state,
      enrollmentsByDate: {
        ...state.enrollmentsByDate,
        loadingState: LoadingStatesEnum.LOADING
      },
    }
  }),
  on(filterEnrollmentByDateSuccess, (state, action) => {
    return {
      ...state,
      enrollmentsByDate: {
        enrollmentInfo: action.response,
        loadingState: LoadingStatesEnum.LOADED
      },
    }
  }),
  on(filterEnrollmentByDateFailed, (state, action) => {
    return {
      ...state,
      enrollmentsByDate: {
        ...state.enrollmentsByDate,
        loadingState: LoadingStatesEnum.ERROR
      },
    }
  }),
)

export function EnrollmentReducer(state: {
  enrollmentInfo: EnrollmentResponseModel;
  loadingState: LoadingStatesEnum;
  enrollmentsByDate: {
    enrollmentInfo: EnrollmentResponseModel;
    loadingState: LoadingStatesEnum;
  }
}, action: any) {
  return _EnrolmentReducer(state, action)
}
