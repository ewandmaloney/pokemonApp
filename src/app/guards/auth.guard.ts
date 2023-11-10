import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { PokemonService } from "../services/pokemon.service";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class authGuard {
  constructor(private pokeServ: PokemonService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    const pokeId = next.params['id'];

    if (pokeId) {
      return this.pokeServ.pokemonType(pokeId).pipe(
        map(isFire => {
          if (isFire) {
            console.log('No puedes entrar al ser de tipo fuego');
            this.router.navigate(['page-not-found'])
            return false;
          } else {
            return true;
          }
        }),
        catchError((error) => {
          console.error(error);
          return of(false);
        })
      );
    } else {
      this.router.navigate(['page-not-found']);
      return of(false);
    }
  }
}

//Metodo 1 para quitar el metodo deprecated
export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  return inject(authGuard).canActivate(next);
}
