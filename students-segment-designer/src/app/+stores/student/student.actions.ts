import {createAction, props} from "@ngrx/store";
import {StudentInfoModel} from "./student-info.model";

export const LOAD_STUDENT_INFO = '[Student] fetch Student info '
export const LOAD_STUDENT_INFO_SUCCESS = '[Student] fetch Student info success'
export const LOAD_STUDENT_INFO_FAILED = '[Student] fetch Student info failed'

export const loadStudent = createAction(LOAD_STUDENT_INFO, props<{ id: number }>());
export const loadStudentSuccess = createAction(LOAD_STUDENT_INFO_SUCCESS, props<{ student: StudentInfoModel }>());
export const loadStudentFailed = createAction(LOAD_STUDENT_INFO_FAILED, props<{ errorMessage: string }>());
