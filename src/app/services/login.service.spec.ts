import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

class MockCookieService {
  cookieData: { [key: string]: string } = {
    user: 'cookieUser',
    id: 'cookieId'
  };

  get(key: string) {
    return this.cookieData[key];
  }

  put(key: string, value: string) {
    this.cookieData[key] = value;
  }

  remove(key: string) {
    delete this.cookieData[key];
  }
}

describe('LoginService', () => {
  let service: LoginService;
  let cookie: CookieService;
  let httpMock: HttpTestingController;
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: CookieService, useClass: MockCookieService }
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(LoginService);
    cookie = TestBed.inject(CookieService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save cookie', () => {
    service.saveCookie('testEmail', 'testId');
    expect(cookie.get('user')).toEqual('testEmail');
    expect(cookie.get('id')).toEqual('testId');
  });

  it('should get cookie user', () => {
    const user = service.getCookieUser();
    expect(user).toEqual('cookieUser');
  });

  it('should get cookie id', () => {
    const id = service.getCookieId();
    expect(id).toEqual('cookieId');
  });

});