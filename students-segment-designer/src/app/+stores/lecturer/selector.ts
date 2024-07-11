import {createFeatureSelector, createSelector} from "@ngrx/store";
import {LecturerInfoModel} from "./lecturer-info.model";
import {LoadingStatesEnum} from "../../models/loading-states.enum";


const getLecturerState = createFeatureSelector<{
  lecturerInfo: LecturerInfoModel,
  loadingState: LoadingStatesEnum
}>('lecturerReducer')

export const getLecturerInfo = createSelector(getLecturerState, (state:{
  lecturerInfo: LecturerInfoModel,
  loadingState: LoadingStatesEnum
}) => {
  return state
})
