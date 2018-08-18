import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from 'app/shared/auth/auth.service'
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent {
  @ViewChild('f') registerForm: NgForm;

  constructor(private router: Router,
              private  authService: AuthService) {
  }

  onSubmit() {
    conosle.log('SUBMIT', this.registerForm.value.inputEmail, this.registerForm.value.inputPass);
    this.authService.signupUser(this.registerForm.value.inputEmail, this.registerForm.value.inputPass).subscribe(val => {
      console.log('&&&&&&& VAL', val);
    }, err => {
      console.log('&&&&&&& ERR', err);
      this.registerForm.reset();
      this.authService.setToken(err.error.text);
      this.router.navigate(['dashboard/dashboard1']);
    });

  }
}
