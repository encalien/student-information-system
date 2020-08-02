import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  })

  constructor(private router: Router, private authService: AuthenticationService) {
      if (authService.isLoggedIn()) {
        router.navigate(['overview']);
      }
  }

  ngOnInit(): void {

  }

  login(): void {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    console.log("logging in with email: " + email + " and password: " + password);

    if (email && password) {
      this.authService.authenticate(email, password)
        .subscribe(
          (user) => { if (user) { this.router.navigate(["/overview"]) } }
        );
    }
  }
}