
import {Component, OnInit,ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../services/auth.service'
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  @ViewChild('f') registerForm: NgForm;

  constructor(private router: Router,
    private  authService: AuthService) {
}

  ngOnInit() {
  }

  onSubmit() {
    console.log('SUBMIT', this.registerForm.value.fname, this.registerForm.value.inputPass);
    this.authService.signupUser(this.registerForm.value.fname, this.registerForm.value.inputPass).subscribe((data) => {
      this.registerForm.reset();
      this.authService.setToken(data.token);
      this.router.navigate(['/status']);
    });

  }
}