import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updatePhoneNumber, updateProfile } from '@angular/fire/auth';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { InfoDialogsService } from './info-dialogs.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {


  constructor(private _fireAuth: Auth, private loginServ: LoginService, private router: Router, private dialog: InfoDialogsService) { }

  //Registrar nuevo usuario
  registerNewUser(name: string, email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: name,
      }).catch((error) => {
        console.log(error)
      })

      console.log(user)
      this.loginServ.saveCookie(user.email!, user.uid);
      this.router.navigate(['pokemons/all']);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        this.dialog.showError('¡Error!', 'La contraseña es muy débil.');
      } else if (errorCode === 'auth/email-already-in-use') {
        this.dialog.showError('¡Error!', 'El correo electrónico ya está en uso.');
      } else {
        this.dialog.showError('¡Error!', errorMessage);
      }
    });
  }

  //Iniciar sesión
  login(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      //Login completado
      this.loginServ.saveCookie(user.email!, user.uid);
      this.dialog.showSuccess('¡Éxito!', '¡Has iniciado sesión correctamente!');
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

  //Cerrar sesión
  logout() {
    const auth = getAuth();
    auth.signOut().then(() => {
      this.loginServ.deleteCookie();
    }).catch((error) => {
      console.log(error)
    });
  }

  userStillActive() {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
    });
  }

}
