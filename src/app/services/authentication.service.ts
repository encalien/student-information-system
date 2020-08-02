import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { USERS } from '../models/mock-users';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  expiryTime: number = 3600;

  constructor() { // private http: HttpClient
  }

  authenticate(email:string, password:string): Observable<User | null> {
    console.log("looking for user");
    let user = USERS.find(user => user.email === email && user.password === password);
    if (user) { this.setSession(user) };
    return of(user || null);

    // return this.http.post<User>('/api/login', {email, password})
    //   .do(res => this.setSession) 
    //   .shareReplay();
  }
        
  private setSession(user: User): void {
    let expiresAt = moment().add(this.expiryTime, "second");
    let currentSession = {
      "current_user": user,
      "expires_at": expiresAt.valueOf()
    }
    localStorage.setItem('currentSession', JSON.stringify(currentSession));
  }
  
  // private setSession(authResult) {
  //   const expiresAt = moment().add(authResult.expiresIn,'second');

  //   localStorage.setItem('id_token', authResult.idToken);
  //   localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  // }          

  logout(): void {
    localStorage.removeItem("currentSession");
  }

  public isLoggedIn(): boolean {
    if (!localStorage["currentSession"]) return false;
    let currentSessionExpiresAt = JSON.parse(localStorage["currentSession"]).expires_at
    return moment().isBefore(currentSessionExpiresAt);
  }

  // isLoggedOut() {
  //   return !this.isLoggedIn();
  // }

  // getExpiration() {
  //   const expiration = localStorage.getItem("expires_at");
  //   const expiresAt = JSON.parse(expiration);
  //   return moment(expiresAt);
  // }    
}