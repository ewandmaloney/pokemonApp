import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { catchError, map, of } from 'rxjs';
import { LoginService } from '../services/login.service';

export const authFnGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {

  //Metodo 2 para crear un guard sin la funcion deprecated
  const id = route.params['id'];
  const pokeServ = inject(PokemonService);
  const router = inject(Router);
  const loginServ = inject(LoginService);
  const users = loginServ.getAllUsers();
  const user = loginServ.getCookie();

  if (id) {
    return pokeServ.pokemonType(id).pipe(
      map(isFire => {
        if (isFire) {
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
