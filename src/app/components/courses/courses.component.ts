import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api'; 
import { Router } from '@angular/router';
import { Professor } from '../../models/professor';
import { Course } from '../../models/course';
import { Student } from '../../models/student';
import { CourseService } from '../../services/course.service';
import { ProfessorService } from '../../services/professor.service';
import { StudentService } from '../../services/student.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
  allCourses: any[];
  listedCourses: Course[];
  courseStudents: Student[];
  listedStudents: Student[];
  totalRecords: number;
  totalStudentRecords: number;
  coursesTableColumns: any[];
  studentsTableColumns: any[];
  loadingCourses: boolean;
  loadingStudents: boolean;
  professors: any[];
  students: any[];
  displayStudents: boolean;
  showTable: boolean = false;
  
  constructor(
    private authService: AuthenticationService,
    private courseService: CourseService,
    private professorService: ProfessorService,
    private studentService: StudentService,
    private router: Router) {
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    }

    // this.courseService.getCourses();

    this.getCourses();
    this.defineCourseTableColumns();
    this.defineStudentsTableColumns();
    this.loadingCourses = true;
    this.loadingStudents = false;
  }

  getCourses(): void {
    this.professorService.fetchProfessors().subscribe(foundProfessors => {
      this.professors = foundProfessors;

      this.studentService.fetchStudents().subscribe(students => {
        this.students = students

        this.courseService.fetchCourses().subscribe(courses => {
          this.allCourses = courses;
          this.allCourses = this.allCourses.map(course => {

            // populate professor
            let professor = this.professors.find(professor => professor.id === course.professorId);
            course["professorName"] = professor.firstName + " " + professor.lastName;
            delete course["professorId"];

            // populate students
            course["courseStudents"] = this.students.filter(student => {
              return student.enrolledCourseIds.includes(course.id)
            });
            
            return course;
          });
          console.log(this.allCourses);
        });

      });
    });
  }

  defineCourseTableColumns(): void {
    this.coursesTableColumns = [
      { field: 'name', header: 'Course Name' },
      { field: 'professorName', header: 'Taught By' }
    ];
  }

  defineStudentsTableColumns(): void {
    this.studentsTableColumns = [
      { field: 'studentNumber', header: 'Student ID' },
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' }
    ];
  }

  lazyLoadCourses(event: LazyLoadEvent): void {
    this.loadingCourses = true;

    //imitate db connection over a network
    setTimeout(() => {
      if (this.allCourses) {
          this.listedCourses = this.allCourses.slice(event.first, (event.first + event.rows));
          this.loadingCourses = false;
      }
    }, 1000);  
  }

  lazyLoadStudents(event: LazyLoadEvent): void {
    if (this.courseStudents) {
      this.loadingStudents = true;

      //imitate db connection over a network
      setTimeout(() => {
        this.listedStudents = this.courseStudents.slice(event.first, (event.first + event.rows));
        this.loadingStudents = false;
      }, 1000);  
    }
  }

  showStudents(course) {
    this.listedStudents = course.courseStudents;
    this.showTable = true;
    this.displayStudents = true;
  }
}
