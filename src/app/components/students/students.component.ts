import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { StudentService } from 'src/app/services/student.service';
import { LazyLoadEvent } from 'primeng/api'; 
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service'

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})

export class StudentsComponent implements OnInit {
  allStudents: Student[];
  listedStudents: Student[];
  totalRecords: number;
  columns: any[];
  loading: boolean;

  selectedStudent: Student;
  
  constructor(
    private studentService: StudentService,
    private authService: AuthenticationService,
    private router: Router) {
  }
  
  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    }

    this.getStudents();
    this.defineColumns();
    this.loading = true;
  }

  getStudents(): void {
    this.studentService.fetchStudents()
      .subscribe(students => {
        this.allStudents = students;
        this.totalRecords = students.length;
      });
  }

  defineColumns(): void {
    this.columns = [
      { field: 'studentNumber', header: 'Student ID' },
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'studyYear', header: 'School Year' },
    ];
  }

  lazyLoadStudents(event: LazyLoadEvent): void {
    this.loading = true;

    //imitate db connection over a network
    setTimeout(() => {
      if (this.allStudents) {
          this.listedStudents = this.allStudents.slice(event.first, (event.first + event.rows));
          this.loading = false;
      }
    }, 1000);  
  }
    
  onSelect(student: Student): void {
    this.selectedStudent = student;
    this.router.navigate(['./students/' + this.selectedStudent.id]);
  }
}
  