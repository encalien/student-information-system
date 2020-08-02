import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service'

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  availableCourses: any[];
  selectedCourses: string[];
  newStudent: Student;
  submitted: boolean = false;
  studyYear: number;
  dateOfBirth: string;
  firstName: string;
  lastName: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    }

    this.availableCourses = [
      {name: "Computer Science 101", code: 'CS101', year: 1},
      {name: "Intro to Databases", code: 'ID', year: 2},
      {name: "Algorithms and Data Types", code: 'ADT', year: 1},
      {name: "Programming Practicum", code: 'PP', year: 1},
      {name: "Machine Learning", code: 'ML', year: 3}
    ];
  }

  search(event): void {
    this.availableCourses.map(data => {
      if (data.name.includes(event.query)) {
        this.availableCourses = data;
        console.log(event.query);
        console.log(this.availableCourses);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.newStudent = new Student(this.firstName, this.lastName, this.dateOfBirth, this.generateId(), this.studyYear, this.selectedCourses);
    this.submitted = true; 

    // To redirect to the new student page:
    // this.router.navigate(['./students/' + this.newStudent.studentId]);
    console.log(this.newStudent);
  }

  generateId(): string {
    let part1: number;
    let part2: number;
    let part3: number;

    let id: string;

    // generate Fibonacci sequence up to highest 3-digit number
    let fibonacciSeq: number[] = [0, 1]
    let nextInSequence: number = 1;
    
    while (nextInSequence < 987) {
      nextInSequence = fibonacciSeq[fibonacciSeq.length - 1] + fibonacciSeq[fibonacciSeq.length - 2];
      fibonacciSeq.push(nextInSequence);
    }

    // pick part 3
    part3 = fibonacciSeq[Math.floor(Math.random() * fibonacciSeq.length)]; 

    // pick a valid part 2
    part2 = Math.ceil(Math.random() * (998 - part3))

    // calculate part 1
    part1 = part3 + part2

    console.log(part1);
    console.log(part2);
    console.log(part3);

    id = this.addLeadingZero(part1) + this.addLeadingZero(part2) + this.addLeadingZero(part3);
    console.log(id);
    return (id);
  }

  addLeadingZero(value: number): string {
    let valueString = value.toString();
    while (valueString.length < 3) {
      valueString = "0" + valueString;
    }
    return valueString;
  }

}
