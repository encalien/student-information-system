import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service'
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  links: MenuItem[];

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    this.links = [
      { label: 'Student Overview', routerLink: "/overview"},
      { label: 'Professor Overview', routerLink: "/professors"},
      { label: 'Add Student', routerLink: "/students/new"},
      { label: 'Log In', routerLink: "/login"},
      { label: 'Log Out', command: () => this.logout() },
    ];
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
