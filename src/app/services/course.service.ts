import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProfessorService } from './professor.service';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  ROOT_URL = "http://localhost:3000";

  constructor(
    private http: HttpClient,
    private professorService: ProfessorService,
    private studentService: StudentService
    ) { }

  fetchCourses(): Observable<any> {
    return this.http.get(this.ROOT_URL + "/courses");
  }

  getCourses() {
    let populatedCourses;
    let professors;

    this.professorService.fetchProfessors().subscribe(foundProfessors => {
      professors = foundProfessors;

      this.http.get(this.ROOT_URL + "/courses").subscribe(courses => {
        populatedCourses = courses;
        populatedCourses = populatedCourses.map(course => {
          course["professor"] = professors.find(professor => professor.id === course.professorId);
          delete course["professorId"];
          return course;
        });
        console.log(populatedCourses);
      })
    });
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
