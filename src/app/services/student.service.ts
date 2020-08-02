import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Student } from '../models/student';
import { STUDENTS } from '../models/mock-students';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  constructor() { }

  getStudents(): Observable<Student[]> {
    return of(STUDENTS);
  }

  getStudent(studentId: string): Observable<Student> {
    console.log(studentId)
    return of(STUDENTS.find(student => student.studentId === studentId));
  }
}
