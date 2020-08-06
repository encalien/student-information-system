export class Professor {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public taughtCourseIds: number[],
  ) { }
}