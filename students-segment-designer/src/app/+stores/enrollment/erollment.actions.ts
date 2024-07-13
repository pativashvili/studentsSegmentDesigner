import {createAction, props} from "@ngrx/store";

export const LOAD_ENROLLMENT_BY_ID = '[enrollment] load enrollment by id lecturer info '
export const LOAD_ENROLLMENT_BY_ID_SUCCESS = '[enrollment] load enrollment by id success'
export const LOAD_ENROLLMENT_BY_ID_FAILED = '[enrollment] load enrollment by id failed'

export const loadEnrollmentById = createAction(LOAD_ENROLLMENT_BY_ID, props<{ minGrade? : number, maxGrade? : number }>());
export const loadEnrollmentByIdSuccess = createAction(LOAD_ENROLLMENT_BY_ID_SUCCESS, props<{ response: any }>());
export const loadEnrollmentByIdFailed = createAction(LOAD_ENROLLMENT_BY_ID_FAILED);

export const FILTER_ENROLLMENT_BY_DATE = '[enrollment] filter enrollment by date lecturer info '
export const FILTER_ENROLLMENT_BY_DATE_SUCCESS = '[enrollment] filter enrollment by date success'
export const FILTER_ENROLLMENT_BY_DATE_FAILED = '[enrollment] filter enrollment by date failed'

export const filterEnrollmentByDate = createAction(FILTER_ENROLLMENT_BY_DATE, props<{ startDate?: string, endDate?: string, minGrade?: number, maxGrade?: number, courseId?: number}>());
export const filterEnrollmentByDateSuccess = createAction(FILTER_ENROLLMENT_BY_DATE_SUCCESS, props<{ response: any }>());
export const filterEnrollmentByDateFailed = createAction(FILTER_ENROLLMENT_BY_DATE_FAILED);
