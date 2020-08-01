import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service'


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

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {

  }

  login(): void {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    console.log("logging in with email: " + email + " and password: " + password);

    if (email && password) {
      this.authService.authenticate(email, password)
        .subscribe(
          (user) => {
            console.log("User " + user.email + " is logged in");
            this.router.navigate(["/overview"]);
          }
        );
    }

  }

}
//
// export class LoginComponent {
//     form:FormGroup;

//     constructor(private fb:FormBuilder, 
//                  private authService: AuthService, 
//                  private router: Router) {

//         this.form = this.fb.group({
//             email: ['',Validators.required],
//             password: ['',Validators.required]
//         });
//     }

//     login() {
//         const val = this.form.value;

//         if (val.email && val.password) {
//             this.authService.login(val.email, val.password)
//                 .subscribe(
//                     () => {
//                         console.log("User is logged in");
//                         this.router.navigateByUrl('/');
//                     }
//                 );
//         }
//     }
// }