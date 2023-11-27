import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { InfoDialogsService } from 'src/app/services/info-dialogs.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public email: string = '';
  public password: string = '';
  public loading: boolean = false;

  constructor(private logServ: LoginService, private router: Router, private dialog: InfoDialogsService, private auth: FirebaseAuthService) { }


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

    const { email, password } = form.value;
    this.dialog.showLoading('Loading...');
    this.auth.login(email, password);
    this.loading = false;

    // this.logServ.logIn(email).subscribe((result) => {
    //   console.log(result)
    //   let user = this.logServ.getCookieUser();
    //   if (user) {
    //     this.dialog.showSuccess('Success!', 'Logged in successfully');
    //   } else {
    //     this.dialog.showError('Error', 'Credentials are not valid');
    //   }
    //   this.loading = false;
    // });
  }
}
