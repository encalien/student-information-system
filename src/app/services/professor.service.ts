import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProfessorService {
  ROOT_URL = "http://localhost:3000/professors";

  constructor(private http: HttpClient) { }

  fetchProfessors(): Observable<any> {
    return this.http.get(this.ROOT_URL);
  } 

}
