import { Component, OnInit } from '@angular/core';
import { updateProfile } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { InfoDialogsService } from 'src/app/services/info-dialogs.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  public signupForm!: FormGroup;
  public loading: boolean = false;
  public language: string[] = ['Ingles', 'Español']
  public gender: string[] = ['Hombre', 'Mujer', 'Otro']
  public submitted: boolean = false;


  constructor(private auth: FirebaseAuthService, private router: Router, private dialog: InfoDialogsService, private loginServ: LoginService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      'phone_number': new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]*')]),
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(30), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      'gender': new FormControl(null, [Validators.required]),
      'language': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      'password_confirmation': new FormControl(null, [Validators.required]),
    })
  }


  onSubmit(form: FormGroup) {
    this.submitted = true;
    this.loading = true;

    if (form.invalid || form.value.password != form.value.password_confirmation) {
      this.loading = false;
      return;
    }

    const { name, email, password } = form.value;

    console.log(form)

    this.auth.registerNewUser(name, email, password).then((userCredential) => {
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

    console.log(form)
  }


}
