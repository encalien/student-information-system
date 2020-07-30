import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StudentService }  from '../student.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})


export class StudentDetailComponent implements OnInit {
  // student: Student = {
  //   firstName: "John",
  //   lastName: "Doe",
  //   dateOfBirth: "01.01.1987",
  //   studentId: 123456789,
  //   studyYear: 1,
  //   enrolledCourses: ["Computer science 101", "Programming Practicum"]
  // }

  @Input()
  student: Student;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location) { }

  ngOnInit(): void {
    this.getStudent();
  }
  
  getStudent(): void {
    const studentId = +this.route.snapshot.paramMap.get('studentId');
    console.log(this.route.snapshot.paramMap.get('studentId'))
    this.studentService.getStudent(studentId)
      .subscribe(student => this.student = student);
    console.log(this.student)
  }

  goBack(): void {
    this.location.back();
  }
}
