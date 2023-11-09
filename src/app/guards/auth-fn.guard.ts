import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { catchError, map, of, take } from 'rxjs';
import { LoginService } from '../services/login.service';

export const authFnGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {

  //Metodo 2 para crear un guard sin la funcion deprecated
  const id = route.params['id'];
  const pokeServ = inject(PokemonService);
  const router = inject(Router);
  const loginServ = inject(LoginService);
  let authorizedUser: any[] = [];
  let users: any;
  let authorized: any;

  loginServ.getAllUsers().pipe(take(1)).subscribe((user) => {
    users = user
    const userEmail = loginServ.getCookie();
    authorizedUser = users.filter((user: any) => (user.first_name == 'Lindsay' || user.first_name == 'Rachel') && user.email == userEmail)
  });



  if (id) {
    return pokeServ.pokemonType(id).pipe(
      map(isFire => {
        if (isFire) {
          if (authorizedUser.length > 0) {
            return true;
          }
          console.log('No puedes entrar al ser de tipo fuego');
          router.navigate(['page-not-found'])
          return false;
        } else {
          return true;
        }
      }),
      catchError((error) => {
        return of(false);
      })
    );
  }
  return true
};

