export class Student {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public dateOfBirth: string,
    public studentNumber: string,
    public studyYear: number,
    public enrolledCourseIds: string[]  
  ) { }
}