import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Student } from '../../models/student';
import { Course } from '../../models/course';
import { Router } from '@angular/router';
import { StudentService }  from 'src/app/services/student.service';
import { AuthenticationService } from 'src/app/services/authentication.service'
import { CourseService } from 'src/app/services/course.service'

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})

export class StudentDetailComponent implements OnInit {
  availableCourses: Course[];
  enrolledCourses: Course[];
  student: Student;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private studentService: StudentService,
    private authService: AuthenticationService,
    private courseService: CourseService,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    }

    this.courseService.fetchCourses().subscribe(courses => {
      this.availableCourses = courses;
      this.getStudent();
    });

  }
  
  getStudent(): void {
    let id: string = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.studentService.fetchStudent(id)
      .subscribe(student => {
        this.student = student;
        console.log(student);
        this.enrolledCourses = student.enrolledCourseIds.map(id => {
          return this.availableCourses.find(course => {
            return course.id.toString() === id;
          });
        })
        console.log("----")
        console.log(this.enrolledCourses)
      });
  }

  deleteStudent(): void {
    this.studentService.deleteStudent(this.student.id).subscribe(student => {
      this.router.navigate(['overview']);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
