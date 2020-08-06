import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api'; 
import { Router } from '@angular/router';
import { Professor } from '../../models/professor';
import { Course } from '../../models/course';
import { Student } from '../../models/student';
import { CourseService } from '../../services/course.service';
import { ProfessorService } from '../../services/professor.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  allCourses: any[];
  listedCourses: Course[];
  totalRecords: number;
  columns: any[];
  loading: boolean;
  professors: any[];
  
  constructor(
    private authService: AuthenticationService,
    private courseService: CourseService,
    private professorService: ProfessorService,
    private router: Router) {
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    }

    // this.courseService.getCourses();

    this.getCourses();
    this.defineColumns();
    this.loading = true;
  }

  getCourses(): void {
    this.professorService.fetchProfessors().subscribe(foundProfessors => {
      this.professors = foundProfessors;

      this.courseService.fetchCourses().subscribe(courses => {
        this.allCourses = courses;
        this.allCourses = this.allCourses.map(course => {
          let professor = this.professors.find(professor => professor.id === course.professorId);
          course["professorName"] = professor.firstName + " " + professor.lastName;
          delete course["professorId"];
          return course;
        });
        console.log(this.allCourses);
      });
    });
  }

  defineColumns(): void {
    this.columns = [
      { field: 'name', header: 'Course Name' },
      { field: 'professorName', header: 'Taught By' }
    ];
  }

  lazyLoadCourses(event: LazyLoadEvent): void {
    this.loading = true;

    //imitate db connection over a network
    setTimeout(() => {
      if (this.allCourses) {
          this.listedCourses = this.allCourses.slice(event.first, (event.first + event.rows));
          this.loading = false;
      }
    }, 1000);  
  }

}
