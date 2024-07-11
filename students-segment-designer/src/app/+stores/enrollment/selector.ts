import {createFeatureSelector, createSelector} from "@ngrx/store";
import {LoadingStatesEnum} from "../../models/loading-states.enum";
import {EnrollmentResponseModel} from "../../services/models/enrollment-response.model";

const getEnrollmentState = createFeatureSelector<{
  enrollmentInfo: EnrollmentResponseModel;
  loadingState: LoadingStatesEnum;
  enrollmentsByDate: {
    enrollmentInfo: EnrollmentResponseModel;
    loadingState: LoadingStatesEnum;
  }
}>('enrollmentReducer')

export const getEnrollmentInfo = createSelector(getEnrollmentState,
  (state) => {
    return state
  })
export const getFilteredByDateEnrollmentInfo = createSelector(getEnrollmentState,
  (state) => {
    return state.enrollmentsByDate
  })
