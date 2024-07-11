import {createFeatureSelector, createSelector} from "@ngrx/store";
import {LoadingStatesEnum} from "../../models/loading-states.enum";
import {StudentInfoModel} from "./student-info.model";


const getStudentState = createFeatureSelector<{
  studentInfo: StudentInfoModel,
  loadingState: LoadingStatesEnum
}>('studentReducer')

export const getStudentInfo = createSelector(getStudentState, (state: {
  studentInfo: StudentInfoModel,
  loadingState: LoadingStatesEnum
}) => {
  return state
})
