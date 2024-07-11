import {createAction, props} from "@ngrx/store";

export const LOAD_LECTURER_INFO = '[lecturer] fetch lecturer info '
export const LOAD_LECTURER_INFO_SUCCESS = '[lecturer] fetch lecturer info success'
export const LOAD_LECTURER_INFO_FAILED = '[lecturer] fetch lecturer info failed'

export const loadLecturer = createAction(LOAD_LECTURER_INFO, props<{ entityNo: string }>());
export const loadLecturerSuccess = createAction(LOAD_LECTURER_INFO_SUCCESS, props<{ lecturer: any }>());
export const loadLecturerFailed = createAction(LOAD_LECTURER_INFO_FAILED, props<{ errorMessage: string }>());
