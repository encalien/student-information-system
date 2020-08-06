import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { Student } from '../models/student';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class StudentService {
  fibonacciSeq: number[];
  lastStudent: Student;

  ROOT_URL = "http://localhost:3000";

  constructor(private http: HttpClient) { 
    this.fibonacciSeq = this.generateFibonacciSequence();
    this.fetchStudents().subscribe(allStudents => {
      this.lastStudent = allStudents[allStudents.length - 1]
    })
  }

  fetchStudents(): Observable<any> {
    return this.http.get(this.ROOT_URL + "/students");
  } 

  fetchStudent(id: string): Observable<any> {
    return this.http.get(this.ROOT_URL + "/students/" + id);
  }

  createStudent(
      firstName: string, 
      lastName: string, 
      dateOfBirth: string, 
      studyYear: number, 
      courses: Course[]
    ): Observable<any> {
    let newId = (Number(this.lastStudent.id) + 1).toString();
    let newStudentId = this.generateId();
    let enrolledCourseIds = courses.map(course => course.id);

    let student = new Student(newId, firstName, lastName, dateOfBirth, newStudentId, studyYear, enrolledCourseIds);
    
    return this.http.post(this.ROOT_URL + "/students", student);
  }

  updateStudent(student: Student): Observable<any> {
    return this.http.put(this.ROOT_URL + "/students/" + student.id, student);
  }

  deleteStudent(id: string) {
    return this.http.delete(this.ROOT_URL + "/students/" + id);
  }

  generateId(): string {
    let part1: number;
    let part2: number;
    let part3: number;

    let id: string;

    // find latest student id and get its three parts
    let lastId:string = this.lastStudent.studentNumber;
    let lastIdParts:any[] = lastId.match(/.{1,3}/g);
    lastIdParts = lastIdParts.map(part => parseInt(part));
    console.log(lastIdParts);

    // find next possible number
    part1 = lastIdParts[0];
    let currentFibNumIndex = this.fibonacciSeq.indexOf(lastIdParts[2]) - 1
    while(true) {
      if (currentFibNumIndex >= 0) {
        part3 = this.fibonacciSeq[currentFibNumIndex];
        part2 = part1 - part3;
        break;
      } else {
        part1++;
        let possibleFibNumArray = this.fibonacciSeq.filter(num => num <= part1);
        currentFibNumIndex = this.fibonacciSeq.findIndex(num => {
          return num === possibleFibNumArray[possibleFibNumArray.length - 1];
        });
      }
    }

    console.log(part1);
    console.log(part2);
    console.log(part3);

    // compile parts into id string

    id = this.addLeadingZero(part1) + this.addLeadingZero(part2) + this.addLeadingZero(part3);
    console.log(id);
    return (id);
  }

  generateFibonacciSequence(): number[] {
    // generate Fibonacci sequence up to highest 3-digit number
    let fibonacciSeq: number[] = [0, 1];
    let nextInSequence: number = 1;
    
    while (nextInSequence < 987) {
      nextInSequence = fibonacciSeq[fibonacciSeq.length - 1] + fibonacciSeq[fibonacciSeq.length - 2];
      fibonacciSeq.push(nextInSequence);
    }
    return fibonacciSeq;
  }

  addLeadingZero(value: number): string {
    let valueString = value.toString();
    while (valueString.length < 3) {
      valueString = "0" + valueString;
    }
    return valueString;
  }
}


