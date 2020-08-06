import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api'; 
import { Router } from '@angular/router';
import { Professor } from '../../models/professor';
import { Course } from '../../models/course';
import { ProfessorService } from '../../services/professor.service';
import { CourseService } from '../../services/course.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.scss']
})

export class ProfessorsComponent implements OnInit {
  allProfessors: any[];
  listedProfessors: Professor[];
  totalRecords: number;
  columns: any[];
  loading: boolean;

  courses: Course[];
  
  constructor(
    private authService: AuthenticationService,
    private professorService: ProfessorService,
    private courseService: CourseService,
    private router: Router) {
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    }

    this.getProfessors();
    this.defineColumns();
    this.loading = true;
  }

  getCourses(): void {
  }

  getProfessors(): void {
    this.courseService.fetchCourses().subscribe(courses => {
      this.courses = courses;
      console.log(courses);
      this.professorService.fetchProfessors().subscribe(professors => {
        this.allProfessors = professors;
        this.totalRecords = professors.length;

        // map course ids to course names for table display
        this.allProfessors.map(professor => {
          professor.taughtCourseIds = professor.taughtCourseIds.map(courseId => {
            let foundCourse = courses.find(course => course.id === courseId)
            return foundCourse.name
          });
          console.log(professor.taughtCourseIds)
          return professor;
        })
      })
    });
  }

  defineColumns(): void {
    this.columns = [
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'taughtCourseIds', header: 'Teaching Courses' },
    ];
  }

  lazyLoadProfessors(event: LazyLoadEvent): void {
    this.loading = true;

    //imitate db connection over a network
    setTimeout(() => {
      if (this.allProfessors) {
          this.listedProfessors = this.allProfessors.slice(event.first, (event.first + event.rows));
          this.loading = false;
      }
    }, 1000);  
  }
}
