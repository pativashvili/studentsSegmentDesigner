import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../../enviroment/enviroment"

@Injectable({
  providedIn: 'root',
})
export class LecturerInfoControllerService {
  private readonly url: string = "/api/lecturer/GetByPersonalNumber"

  constructor(private http: HttpClient) {
  }

  fetchData(personalNumber: string): Observable<Object> {
    const url = environment.lecturerInfoApi + this.url + `?personalNumber=${personalNumber}`
    return this.http.get(url);
  }
}
