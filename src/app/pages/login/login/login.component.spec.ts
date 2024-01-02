import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie';
import { of } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InfoDialogsService } from 'src/app/services/info-dialogs.service';
import { Database } from '@angular/fire/database';
import { Auth } from '@angular/fire/auth';
import { FormsModule, NgForm } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Location } from '@angular/common';

class MockCookieService {
  get() {
    return of('mock value');
  }
}

class MockDatabase {
  get() {
    return of('mock value');
  }
}

class MockAuth {
  get() {
    return of('mock auth');
  }
}

class MockFirebase {
  get() {
    return of('mock firebase')
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let firebase: FirebaseService
  let loginServ: LoginService
  let dialog: InfoDialogsService
  let locaction: Location

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        FirebaseService,
        LoginService,
        TranslateService,
        InfoDialogsService,
        { provide: CookieService, useClass: MockCookieService },
        { provide: Database, useClass: MockDatabase },
        { provide: Auth, useClass: MockAuth },
      ],
      imports: [HttpClientTestingModule, FormsModule, TranslateModule.forRoot(),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    firebase = TestBed.inject(FirebaseService)
    dialog = TestBed.inject(InfoDialogsService)
    locaction = TestBed.inject(Location)
    loginServ = TestBed.inject(LoginService)
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('comprueba que funciona el ngOnInit y retorna usuario', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    spyOn(loginServ, 'getCookieUser').and.returnValue('mock value');
    spyOn(dialog, 'showConfirmationDialog2').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(loginServ.getCookieUser).toHaveBeenCalled();
    expect(dialog.showConfirmationDialog2).toHaveBeenCalled();
  });

  it('comprueba que funciona el ngOnInit y no devuelve ningun usuario', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    spyOn(loginServ, 'getCookieUser').and.returnValue(undefined);
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(loginServ.getCookieUser).toHaveBeenCalled();
  });

});
