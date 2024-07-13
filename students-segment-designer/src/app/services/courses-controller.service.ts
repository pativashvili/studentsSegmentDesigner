import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../../enviroment/enviroment"

@Injectable({
  providedIn: 'root',
})
export class CoursesControllerService {
  private readonly url: string = "/api/Course/GetCoursesByLecturerId"

  constructor(private http: HttpClient) {
  }

  fetchCoursesByLecturerId(id: number): Observable<any> {
    const url = environment.lecturerInfoApi + this.url + `?id=${id}`
    return this.http.get(url);
  }
}
