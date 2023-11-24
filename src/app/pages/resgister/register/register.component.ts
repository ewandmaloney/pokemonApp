import { RegisterService } from './../services/register.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  signupForm!: FormGroup;
  loading: boolean = false;

  constructor(private auth: RegisterService) { }


  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(30), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
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

    this.auth.registerNewUser(email, password)

    console.log(form)
  }


}
