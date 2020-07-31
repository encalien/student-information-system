import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StudentService }  from '../student.service';
import { Student } from '../student';
import { SelectItem } from 'primeng/api';

interface Course {
  name: string,
  code: string,
  year: number
}

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})

export class StudentDetailComponent implements OnInit {
  courses: SelectItem[];
  enrolledCourses: Course[];

  @Input()
  student: Student;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location) {
      this.courses = [
        { label: "Computer Science 101", value: {name: "Computer Science 101", code: 'CS101', year: 1} },
        { label: "Intro to Databases", value: {name: "Intro to Databases", code: 'ID', year: 2} },
        { label: "Algorithms and Data Types", value: {name: "Algorithms and Data Types", code: 'ADT', year: 1} },
        { label: "Programming Practicum", value: {name: "Programming Practicum", code: 'PP', year: 1} },
        { label: "Machine Learning", value: {name: "Machine Learning", code: 'ML', year: 3} }
      ];
    }

  ngOnInit(): void {
    this.getStudent();
  }
  
  getStudent(): void {
    const studentId = +this.route.snapshot.paramMap.get('studentId');
    this.studentService.getStudent(studentId)
      .subscribe(student => this.student = student);
  }

  goBack(): void {
    this.location.back();
  }
}
