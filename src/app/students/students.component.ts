import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements OnInit {
  students: Student[];
  selectedStudent: Student;
  
  constructor(private studentService: StudentService) { }
  
  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(students => this.students = students);
  }
  
  onSelect(student: Student): void {
    this.selectedStudent = student;
    console.log(this.selectedStudent)
  }
}
