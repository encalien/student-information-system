import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Course } from 'src/app/models/course';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
  providers: [ MessageService ]
})
export class StudentFormComponent implements OnInit {
  availableCourses: any;
  selectedCourses: Course[];
  submitted: boolean = false;
  studyYear: number;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  message: any;
  maxDate: Date;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private location: Location,
    private courseService: CourseService,
    private studentService: StudentService,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    }

    this.courseService.fetchCourses().subscribe(courses => {
      this.availableCourses = courses;
    });

    this.messageService.messageObserver.subscribe(message => this.message = message);

    this.maxDate = new Date(2002, 1, 1);
    console.log(this.maxDate)
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
    let nameRegex = /[A-Z][a-z]*/g;
    let newMessage;

    if (!this.firstName){
      newMessage = "First name cannot be empty.";
    }
    else if (!this.lastName){
      newMessage = "First name cannot be empty.";
    }
    else if (!this.dateOfBirth){
      newMessage = "Date of birth cannot be empty.";
    }
    else if (!this.studyYear){
      newMessage = "Study year cannot be empty.";
    }
    else if (!this.selectedCourses){
      newMessage = "Must select at least one enrolled course.";
    }
    else if (!this.firstName.match(nameRegex)){
      newMessage = "First name contains invalid characters.";
    }
    else if (!this.lastName.match(nameRegex)){
      newMessage = "Last name contains invalid characters.";
    }
    else {
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
      
      this.addMessage(newMessage);
  }

  addMessage(message: string) {
    this.messageService.add({
      severity:"error", 
      summary: "ERROR: Can't save student", 
      detail: message
    });
  }
}
