import { TestBed } from '@angular/core/testing';

import { FirebaseAuthService } from './firebase-auth.service';
import { Auth } from '@angular/fire/auth';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { CookieService } from 'ngx-cookie';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InfoDialogsService } from './info-dialogs.service';

class MockAuth {
  get() {
    return 'mock auth';
  }
}

class MockCookieService {
  get() {
    return 'mock cookie';
  }
}

describe('FirebaseAuthService', () => {
  let service: FirebaseAuthService;
  let logServ: LoginService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        TranslateService,
        InfoDialogsService,
        { provide: Auth, useClass: MockAuth },
        { provide: CookieService, useClass: MockCookieService }
      ],
      imports: [
        HttpClientTestingModule, TranslateModule.forRoot()
      ]
    });
    service = TestBed.inject(FirebaseAuthService);
    logServ = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a new user', () => {
    expect(service.registerNewUser('testName', 'testEmail', 'testPassword')).toBeTruthy();
  })

});
