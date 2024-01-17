import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { InfoDialogsService } from 'src/app/services/info-dialogs.service';
import { LoginService } from 'src/app/services/login.service';
import { setUser } from 'src/app/states/actions/pokedex.action';
import { AppState } from 'src/app/states/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public email: string = '';
  public password: string = '';
  public loading: boolean = false;

  constructor(private logServ: LoginService, private location: Location, private router: Router, private dialog: InfoDialogsService, private auth: FirebaseAuthService, private store: Store<AppState>) {
   }


  ngOnInit(): void {
    let user = this.logServ.getCookieUser();
    if (user) {
      this.dialog.showConfirmationDialog2('Warning', 'You are already logged in, do you want to log out?', 'Yes', () => {
        this.logServ.logout();
      }, () => {
        this.location.back();
      });
      // this.dialog.showInformation('Error', 'You are already logged in');
      // this.router.navigateByUrl('/pokemons');
    }
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    console.log(form)

    if (form.invalid) {
      this.loading = false;
      return;
    }

    const { email, password } = form.value;
    this.dialog.showLoading('Loading...');
    this.auth.login(email, password).then((userCredential) => {
      const user = userCredential.user;
      //Login completado
      this.logServ.saveCookie(user.email!, user.uid);
      //Accion para guardar el usuario en el store
      this.store.dispatch(setUser({ userId: user.uid}))
      this.dialog.showSuccess('¡Éxito!', '¡Bienvenido!');
      this.loading = false;
      this.router.navigate(['pokemons/all']);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
        this.dialog.showError('¡Error!', 'El correo electrónico o la contraseña son incorrectos.');
      } else {
        this.dialog.showError('¡Error!', errorMessage);
      }
    });

  }
}
