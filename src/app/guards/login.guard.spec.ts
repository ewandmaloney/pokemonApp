import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { loginGuard } from './login.guard';
import { LoginService } from '../services/login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie';

class MockCoockieService {
  get() {
    return 'mock-cookie';
  }
}

describe('loginGuard', () => {

  let loginServ: LoginService
  let router: Router

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => loginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: CookieService, useClass: MockCoockieService },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ],
      imports: [HttpClientTestingModule]
    });
    loginServ = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if user is logged in', () => {
    spyOn(loginServ, 'getCookieUser').and.returnValue('mock-cookie');
    const result = executeGuard({ params: {} } as unknown as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(result).toBeTrue();
    expect(loginServ.getCookieUser).toHaveBeenCalled()
  });

  it('should return false if user is not logged in', () => {
    spyOn(loginServ, 'getCookieUser').and.returnValue(undefined);
    const result = executeGuard({ params: {} } as unknown as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(loginServ.getCookieUser).toHaveBeenCalled()
  });

});
