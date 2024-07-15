import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class EndorseControlleer {
  private readonly url: string = '/api/Endorsement/AddEndoresment';

  constructor(private http: HttpClient) {}

  endorse(studentId: number, letter: string): Observable<any> {
    const lecturerId = localStorage.getItem('lecturer');
    const url =
      environment.lecturerInfoApi +
      this.url +
      `?studentId=${studentId}` +
      `&lecturerId=${lecturerId}` +
      `&letter=${letter}`;
    return this.http.get(url);
  }
}
