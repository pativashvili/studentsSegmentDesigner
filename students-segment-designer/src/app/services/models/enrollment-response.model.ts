import {EnrollmentsWithCourseResponseModel} from "./enrollments-with-course-response.model";

export interface EnrollmentResponseModel {
  courses: EnrollmentsWithCourseResponseModel[]
  passCount: number
  failCount: number
  maxGrade: number
  minGrade: number
  averageGrade: number
}
