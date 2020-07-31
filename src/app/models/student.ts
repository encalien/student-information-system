export class Student {
  constructor(
    public firstName: string,
    public lastName: string,
    public dateOfBirth: string,
    public studentId: string,
    public studyYear: number,
    public enrolledCourses: string[]  
  ) { }
}