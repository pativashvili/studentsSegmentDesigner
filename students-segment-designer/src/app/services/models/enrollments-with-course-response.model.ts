import {EnrollmentsModel} from "./enrollments-model";

export interface EnrollmentsWithCourseResponseModel {
  course: string;
  enrollments: EnrollmentsModel[]
}
