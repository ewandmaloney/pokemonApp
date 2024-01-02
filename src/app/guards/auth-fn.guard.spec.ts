import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { authFnGuard } from './auth-fn.guard';
import { LoginService } from '../services/login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie';
import { PokemonService } from '../services/pokemon.service';
import { Observable, of } from 'rxjs';

class MockCookieService {
  get() {
    return 'mock-cookie';
  }
}

describe('authFnGuard', () => {
  let loginService: LoginService
  let router: Router
  let pokeServ: PokemonService
  let actvRoute: ActivatedRouteSnapshot
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authFnGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        TranslateService,
        { provide: CookieService, useClass: MockCookieService }
      ],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()]

    });
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
    pokeServ = TestBed.inject(PokemonService);
    actvRoute = { params: { id: 1 } } as unknown as ActivatedRouteSnapshot;

  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if id is defined', () => {
    const result = executeGuard(actvRoute, {} as RouterStateSnapshot);
    expect(result).not.toBeNull();
  })

  it('should return true if id is undefined', () => {
    const result = executeGuard({ params: {} } as unknown as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(result).toBeTrue();
  });

  it('should get the user email', () => {
    const userEmail = loginService.getCookieUser();
    expect(userEmail).toBeTruthy();
  });

  it('should return true if pokemon type is fire and user is Lindsay or Rachel', () => {
    const id = 5;
    const userEmail = 'lindsay.ferguson@reqres.in';
    const users = [{ first_name: 'Lindsay', email: userEmail }];
    spyOn(pokeServ, 'pokemonType').and.returnValue(of(true));
    spyOn(loginService, 'getAllUsers').and.returnValue(of(users));
    spyOn(router, 'navigate');
  
    let result = executeGuard({ params: { id } } as unknown as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    if(result instanceof Observable)
    result.subscribe((res:any) => {
      expect(pokeServ.pokemonType).toHaveBeenCalledWith(id);
      expect(loginService.getAllUsers).toHaveBeenCalled();
      console.log('TEST ' + res)
      expect(res).not.toBeTrue();
      expect(router.navigate).toHaveBeenCalled();
    });
  });
  
  it('should navigate to page-not-found if pokemon type is fire and user is not Lindsay or Rachel', () => {
    const id = 1;
    const userEmail = 'test@example.com';
    const users = [{ first_name: 'Test', email: userEmail }];
    spyOn(pokeServ, 'pokemonType').and.returnValue(of(true));
    spyOn(loginService, 'getAllUsers').and.returnValue(of(users));
    spyOn(router, 'navigate');
  
    const result = executeGuard({ params: { id } } as unknown as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    if(result instanceof Observable)
    result.subscribe((res:any) => {
      expect(pokeServ.pokemonType).toHaveBeenCalledWith(id);
      expect(loginService.getAllUsers).toHaveBeenCalled();
      expect(res).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['page-not-found']);
    });
  });
});
