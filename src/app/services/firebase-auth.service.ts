import { Injectable } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updatePhoneNumber, updateProfile } from '@angular/fire/auth';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { InfoDialogsService } from './info-dialogs.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {


  constructor(private _fireAuth: Auth, private loginServ: LoginService, private router: Router, private dialog: InfoDialogsService) { }

  //Registrar nuevo usuario
  registerNewUser(name: string, email: string, password: string): Promise<UserCredential> {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
  }

  //Iniciar sesión
  login(email: string, password: string): Promise<UserCredential> {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
  }

  //Cerrar sesión
  logout() : Promise<void>{
    const auth = getAuth();
    return auth.signOut()
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
