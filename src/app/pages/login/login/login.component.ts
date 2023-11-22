import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { InfoDialogsService } from 'src/app/services/info-dialogs.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public email: string = '';
  public loading: boolean = false;

  constructor(private logServ: LoginService, private router: Router, private dialog: InfoDialogsService) { }


  ngOnInit(): void {
    let user = this.logServ.getCookieUser();
    if (user) {
      this.dialog.showError('Error', 'You are already logged in');
      this.router.navigateByUrl('/pokemons');
    }
  }

  onSubmit(form: NgForm) {
    this.loading = true;

    if (form.invalid) {
      this.loading = false;
      return;
    }

    const { email } = form.value;

    this.logServ.logIn(email).subscribe((result) => {
      console.log(result)
      let user = this.logServ.getCookieUser();
      if (user) {
        this.dialog.showSuccess('Success!', 'Logged in successfully');
      } else {
        this.dialog.showError('Error', 'Credentials are not valid');
      }
      this.loading = false;
    });
  }
}
