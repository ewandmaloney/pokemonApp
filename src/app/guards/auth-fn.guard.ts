import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Observer, catchError, map, of, switchMap, take } from 'rxjs';
import { LoginService } from '../services/login.service';

export const authFnGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {

  //Metodo 2 para crear un guard sin la funcion deprecated
  const id = route.params['id'];
  const pokeServ = inject(PokemonService);
  const router = inject(Router);
  const loginServ = inject(LoginService);


  //Obtengo el email del usuario logueado (solo puede llegar a esta pagina si esta logueado por eso no hago comprobacion)
  const userEmail = loginServ.getCookie();

  if (id) {
    /*
    Con switchMap, si el pokemon es de tipo fuego, cambia al observable de getAllUsers 
    y comprueba si el usuario logueado es Lindsay o Rachel
    */
    return pokeServ.pokemonType(id).pipe(
      switchMap(isFire => {
        if (isFire) {
          return loginServ.getAllUsers().pipe(
            take(1),
            map((users: any) => {
              const authorizedUser = users.filter((user: any) => (user.first_name == 'Lindsay' || user.first_name == 'Rachel') && user.email == userEmail)
              if (authorizedUser.length > 0) {
                return true;
              } else {
                console.log('No puedes entrar al ser de tipo fuego');
                router.navigate(['page-not-found'])
                return false;
              }
            })
          );
        } else {
          return of(true);
        }
      }),
    );
  }
  return true
}
