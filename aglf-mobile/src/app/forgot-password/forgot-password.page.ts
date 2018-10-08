import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {

  @ViewChild('f') forogtPasswordForm: NgForm;

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  // On submit click, reset form fields
  onSubmit() {
    this.forogtPasswordForm.reset();
  }

  // On login link click
  onLogin() {
    this.router.navigate(['/login']);
  }

  // On registration link click
  onRegister() {
    this.router.navigate(['/register']);
  }

}
