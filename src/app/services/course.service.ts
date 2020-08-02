import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  ROOT_URL = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  fetchCourses(): Observable<any> {
    return this.http.get(this.ROOT_URL + "/courses");
  }

  // getCourses(handleResponse: any) {
  //   this.http.get(this.ROOT_URL + "/courses").subscribe(
  //     data => {
  //       handleResponse(data);
  //     },
  //     error => {
  //       console.log('Error', error);
  //     }
  //   );
  // }
}
