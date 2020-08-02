import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Course } from 'src/app/models/course';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  availableCourses: any;
  selectedCourses: Course[];
  submitted: boolean = false;
  studyYear: number;
  dateOfBirth: string;
  firstName: string;
  lastName: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private location: Location,
    private courseService: CourseService,
    private studentService: StudentService) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    }

    this.courseService.fetchCourses().subscribe(courses => {
      this.availableCourses = courses;
    });
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
    this.studentService.createStudent(
      this.firstName,
      this.lastName,
      this.dateOfBirth,
      this.studyYear,
      this.selectedCourses
    ).subscribe(student => {
      this.router.navigate(['./students/' + student.id]);
    });

    this.submitted = true; 
  }
}
