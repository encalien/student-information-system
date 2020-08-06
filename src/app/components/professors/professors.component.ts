import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api'; 
import { Router } from '@angular/router';
import { Professor } from '../../models/professor';
// import { ProfessorsService } from '../../services/professors.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.scss']
})

export class ProfessorsComponent implements OnInit {
  allProfessors: Professor[];
  listedProfessors: Professor[];
  totalRecords: number;
  columns: any[];
  loading: boolean;

  selectedProfessor: Professor;
  
  constructor(
    private authService: AuthenticationService,
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

  getProfessors(): void {
    this.allProfessors = [
      {
        "id": "1",
        "firstName": "Albus",
        "lastName": "Dumbledore",
        "taughtCourseIds": [
          1
        ]
      },
      {
        "id": "1",
        "firstName": "Minerva",
        "lastName": "McGonagal",
        "taughtCourseIds": [
          2
        ]
      }
    ];
    this.totalRecords = this.allProfessors.length;
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
