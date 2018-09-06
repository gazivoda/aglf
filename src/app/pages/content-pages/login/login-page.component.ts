import {AuthService} from 'app/shared/auth/auth.service'
import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

  @ViewChild('f') loginForm: NgForm;
  invalid: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) {
    if (this.authService.getToken()) {
      this.router.navigate(['dashboard/dashboard1']);
    }
  }

  // On submit button click
  onSubmit() {
    this.authService.signinUser(this.loginForm.value.inputEmail, this.loginForm.value.inputPass).subscribe((data) => {
      this.loginForm.reset();
      this.invalid = false;
      this.authService.setToken(data.token);
      this.router.navigate(['dashboard/dashboard1']);
    }, (err => {
      console.log(err);
      this.invalid = true;
    }));
  }

  // On Forgot password link click
  onForgotPassword() {
    this.router.navigate(['forgotpassword'], {relativeTo: this.route.parent});
  }

  // On registration link click
  onRegister() {
    this.router.navigate(['register'], {relativeTo: this.route.parent});
  }
}
