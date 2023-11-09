import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const loginGuard: CanActivateFn = (route, state) => {

  const loginServ = inject(LoginService);
  const user = loginServ.getCookie();
  const router = inject(Router);

  if (!user) {
    router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
