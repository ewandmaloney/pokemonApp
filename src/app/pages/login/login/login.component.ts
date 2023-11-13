import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public email: string = '';
  public loading: boolean = false;

  constructor(private logServ: LoginService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.loading = true;

    if (form.invalid) {
      this.loading = false;
      return;
    }

    const { email } = form.value;

    this.logServ.logIn(email).subscribe((result) => {
      this.loading = false;
    });
  }
}
