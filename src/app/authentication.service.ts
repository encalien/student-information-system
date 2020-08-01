import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './models/user';
import { USERS } from './models/mock-users';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  expiryTime: number = 60;

  constructor() { // private http: HttpClient
  }

  authenticate(email:string, password:string): Observable<User> {
    console.log("looking for user");
    let user = USERS.find(user => user.email === email && user.password === password);
    if (user) {
      this.setSession(user);
      return of(user);
    };

    // return this.http.post<User>('/api/login', {email, password})
    //   .do(res => this.setSession) 
    //   .shareReplay();
  }
        
  private setSession(user: User): void {
    let loggedInAt = moment();
    let expiresAt = loggedInAt.add(this.expiryTime, "second");
    let currentSession = {
      "current_user": user,
      "id_token": 12345,
      "expires_at": expiresAt.valueOf()
    }
    localStorage.setItem('currentSession', JSON.stringify(currentSession));
  }

}