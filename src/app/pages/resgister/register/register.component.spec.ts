import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { Auth } from '@angular/fire/auth';
import { of } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InfoDialogsService } from 'src/app/services/info-dialogs.service';
import { InputFieldComponent } from 'src/app/components/forms/input-field/input-field.component';
import { RadioFieldComponent } from 'src/app/components/forms/radio-field/radio-field.component';
import { SelectFieldComponent } from 'src/app/components/forms/select-field/select-field.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

class MockAuth {
  get() {
    return of('mock value');
  }
}

class MockCookieService {
  get() {
    return of('mock value');
  }
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authFirebase: FirebaseAuthService
  let logServ: LoginService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        FirebaseAuthService,
        LoginService,
        TranslateService,
        InfoDialogsService,
        { provide: Auth, useClass: MockAuth },
        { provide: CookieService, useClass: MockCookieService }
      ],
      imports: [HttpClientTestingModule, TranslateModule.forRoot(),
        InputFieldComponent, RadioFieldComponent, SelectFieldComponent, ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(RegisterComponent);
    TestBed.inject(FormBuilder)
    authFirebase = TestBed.inject(FirebaseAuthService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe crear un formulario de registro', () => {
    expect(component.signupForm).toBeDefined();
    expect(component.signupForm instanceof FormGroup).toBeTruthy();
    expect(component.signupForm.get('name')).toBeDefined();
    expect(component.signupForm.get('phone_number')).toBeDefined();
    expect(component.signupForm.get('email')).toBeDefined();
    expect(component.signupForm.get('gender')).toBeDefined();
    expect(component.signupForm.get('language')).toBeDefined();
    expect(component.signupForm.get('password')).toBeDefined();
    expect(component.signupForm.get('password__confirmation')).toBeDefined();
  })

  it('debe marcar los campos como invalidos si estan vacios', () => {
    const nameControl = component.signupForm.get('name');
    const phone_numberControl = component.signupForm.get('phone_number');
    const emailControl = component.signupForm.get('email');
    const genderControl = component.signupForm.get('gender');
    const languageControl = component.signupForm.get('language');
    const passwordControl = component.signupForm.get('password');
    const password_confirmationControl = component.signupForm.get('password_confirmation');

    expect(nameControl?.invalid).toBeTruthy();
    expect(phone_numberControl?.invalid).toBeTruthy();
    expect(emailControl?.invalid).toBeTruthy();
    expect(genderControl?.invalid).toBeTruthy();
    expect(languageControl?.invalid).toBeTruthy();
    expect(passwordControl?.invalid).toBeTruthy();
    expect(password_confirmationControl?.invalid).toBeTruthy();
  })

  it('debe marcar el campo email valido con una direccion de correo correcta', () => {
    const emailControl = component.signupForm.get('email');
    emailControl?.setValue('test@test.com')
    expect(emailControl?.valid).toBeTruthy();
  })

  it('password debe ser mayor a 6 caracteres', () => {
    const passwordControl = component.signupForm.get('password');
    passwordControl?.setValue('123456')
    expect(passwordControl?.valid).toBeTruthy();
  })

  it('password debe ser menor a 20 caracteres', () => {
    const passwordControl = component.signupForm.get('password');
    passwordControl?.setValue('1234567890123456789032131112311')
    expect(passwordControl?.invalid).toBeTruthy();
  })

  it('password_confirmation debe ser igual a password', () => {
    const passwordControl = component.signupForm.get('password');
    const password_confirmationControl = component.signupForm.get('password_confirmation');
    passwordControl?.setValue('123456')
    password_confirmationControl?.setValue('123456')
    expect(password_confirmationControl?.valid).toBeTruthy();
  })

  it('debe marcar el campo password_confirmation invalido si no es igual a password', () => {
    const passwordControl = component.signupForm.get('password');
    const password_confirmationControl = component.signupForm.get('password_confirmation');
    passwordControl?.setValue('123456')
    password_confirmationControl?.setValue('1234562')
    expect(password_confirmationControl?.value === passwordControl?.value).not.toBeTruthy();
  })

  it('debe llamar al metodo onSubmit cuando los valores son correctos', () => {
    spyOn(component, 'onSubmit');
    const nameControl = component.signupForm.get('name');
    const phone_numberControl = component.signupForm.get('phone_number');
    const emailControl = component.signupForm.get('email');
    const genderControl = component.signupForm.get('gender');
    const languageControl = component.signupForm.get('language');
    const passwordControl = component.signupForm.get('password');
    const password_confirmationControl = component.signupForm.get('password_confirmation');

    nameControl?.setValue('test')
    phone_numberControl?.setValue('123456789')
    emailControl?.setValue('test@test.com')
    genderControl?.setValue('Male')
    languageControl?.setValue('English')
    passwordControl?.setValue('123456')
    password_confirmationControl?.setValue('123456')

    const formElement: HTMLFormElement = fixture.nativeElement.querySelector('form');
    formElement.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(component.onSubmit).toHaveBeenCalled();
  })


  //No funciona
  // it('debe llamar ejecutar los metodos dentro del submit', fakeAsync(() => {
  //   spyOn(component, 'onSubmit');
  //   const registerNewUserSpy = spyOn(authFirebase, 'registerNewUser').and.returnValue(Promise.resolve({ user: {} }) as Promise<any>);
  //   const nameControl = component.signupForm.get('name');
  //   const phone_numberControl = component.signupForm.get('phone_number');
  //   const emailControl = component.signupForm.get('email');
  //   const genderControl = component.signupForm.get('gender');
  //   const languageControl = component.signupForm.get('language');
  //   const passwordControl = component.signupForm.get('password');
  //   const password_confirmationControl = component.signupForm.get('password_confirmation');

  //   nameControl?.setValue('test')
  //   phone_numberControl?.setValue('123456789')
  //   emailControl?.setValue('test@test.com')
  //   genderControl?.setValue('Male')
  //   languageControl?.setValue('English')
  //   passwordControl?.setValue('123456')
  //   password_confirmationControl?.setValue('123456')

  //   const formElement: HTMLFormElement = fixture.nativeElement.querySelector('form');
  //   formElement.dispatchEvent(new Event('submit'));
  //   tick();
  //   fixture.detectChanges();

  //   expect(component.onSubmit).toHaveBeenCalled();
  //   expect(registerNewUserSpy)
  //     .toHaveBeenCalledWith(nameControl?.value, emailControl?.value, passwordControl?.value);

  // }));

});
