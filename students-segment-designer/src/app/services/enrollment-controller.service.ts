import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../../enviroment/enviroment"

interface EnrollmentsWithCourseResponseModel {
}

@Injectable({
  providedIn: 'root',
})
export class EnrollmentControllerService {
  private readonly url: string = "/api/Enrollment/GetEnrollmentsAndStats"

  constructor(private http: HttpClient) {
  }

  fetchEndorsementsByLecturerId(lecturerId: number, DateFrom?: string, DateTo?: string, MinGrade?: number,  MaxGrade?: number): Observable<any> {
    let url = environment.lecturerInfoApi + this.url + `?lecturerId=${lecturerId}`
    if (DateFrom){
      url = url + `&DateFrom=${DateFrom}`
    }
    if (DateTo){
      url = url + `&DateTo=${DateTo}`
    }
    if (MinGrade){
      url = url + `&MinGrade=${MinGrade}`
    }
    if (MaxGrade){
      url = url + `&MaxGrade=${MaxGrade}`
    }
    return this.http.get(url);
  }
}
