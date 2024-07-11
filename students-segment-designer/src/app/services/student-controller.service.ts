import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../../enviroment/enviroment"

@Injectable({
  providedIn: 'root',
})
export class StudentControllerService {
  private readonly url: string = "/api/Student/GetStudentWithPrivateDataById"

  constructor(private http: HttpClient) {
  }

  fetchStudentData(id: number): Observable<Object> {
    const url = environment.lecturerInfoApi + this.url + `?id=${id}`
    return this.http.get(url);
  }
}
