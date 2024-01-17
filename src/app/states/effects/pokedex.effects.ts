import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, catchError, map, mergeMap, switchMap, take, tap } from "rxjs";
import { FirebaseService } from "src/app/services/firebase.service";

@Injectable()
export class PokedexEffects {
    constructor(private actions$: Actions, private firebase: FirebaseService) { }

    // @Effect()
    loadPokedes$ = createEffect(() => this.actions$.pipe(
        ofType('[Pokedex] Load Pokedex'),
        switchMap(() => this.firebase.leerDatosPokedex()
            .pipe(
                take(1),
                map((pokedex: any) => ({ type: '[Pokedex] Set Pokedex', pokedex })),
                catchError((error) => {
                    console.error("Error cargando los pokemon", error)
                    return EMPTY
                })
            ))
    ))
}