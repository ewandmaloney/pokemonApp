import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public username: string = '';
  public password: string = '';

  constructor(private logServ: LoginService, private router: Router) {

  }

  onSubmit(form: NgForm) {

    if (form.invalid) { return; }

    const {username, password} = form.value;

    this.logServ.logIn(username, password);

  }

}
