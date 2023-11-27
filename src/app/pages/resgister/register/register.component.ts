import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

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


  constructor(private auth: FirebaseAuthService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      'phone_number': new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]*')]),
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(30), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      'gender': new FormControl(null, [Validators.required]),
      'language': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      'password_confirmation': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    })
  }


  onSubmit(form: FormGroup) {
    this.loading = true;

    if (form.invalid || form.value.password != form.value.password_confirmation) {
      this.loading = false;
      return;
    }

    const { name, email, password } = form.value;

    console.log(form)

    this.auth.registerNewUser(name, email, password)

    console.log(form)
  }


}
