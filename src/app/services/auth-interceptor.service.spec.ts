import { TestBed } from '@angular/core/testing';

import { AuthInterceptorService } from './auth-interceptor.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthInterceptorService', () => {
  let service: AuthInterceptorService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthInterceptorService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not intercept if url does not end with login', () => {
    const req = {
      url: 'http://localhost:4200/login',
      method: 'GET',
      body: {
        username: 'admin',
        password: 'admin'
      }
    }
    expect(() => httpController.expectNone(req.url, req.method)).not.toThrow();

  });

  it('should intercept if url ends with login and method is post', () => {
    const req = {
      url: 'http://localhost:4200/login',
      method: 'POST',
      body: {
        username: 'admin',
        password: 'admin'
      }
    }

    expect(() => httpController.expectOne(req.url, req.method)).toThrow();
    service.intercept(req as any, null as any).subscribe((res) => {
      console.log(res)
      expect(res).toBeTruthy();
    });
    const reqMock = httpController.expectOne('assets/users.json');
    expect(reqMock.request.method).toBe('GET');
    reqMock.flush({ username: 'admin', password: 'admin' });


  });




});
