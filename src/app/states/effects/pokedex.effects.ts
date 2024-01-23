import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, catchError, exhaustMap, map, of, switchMap, take } from "rxjs";
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
                map((pokemons: any) => ({ type: '[Pokedex] Set Pokedex', pokemons: pokemons.pokemons })),
                catchError((error) => {
                    console.error("Error cargando los pokemon", error)
                    return EMPTY
                })
            ))
    ))

    // @Effect()
    deletePokemon$ = createEffect(() => this.actions$.pipe(
        ofType('[Pokedex] Delete Pokemon'),
        exhaustMap(({ id }) =>
            this.firebase.leerDatosPokedex().pipe(
                switchMap((pokemons: any) => {
                    let arrayPokemon = Object.values(pokemons.pokemons)
                    let pokemonArray = arrayPokemon.flat()
                    let pokemon = pokemonArray.find((p: any) => p.id === id);
                    if (pokemon) {
                        return of(this.firebase.deletePokemonFromPokedex(id)).pipe(
                            map(() => ({ type: '[Pokedex] Load Pokedex' })),
                            catchError((error) => {
                                console.error("Error deleting the pokemon", error);
                                return of({ type: '[Pokedex] Delete Pokemon Failed' });
                            })
                        );
                    } else {
                        return of({ type: '[Pokedex] Delete Pokemon Failed' });
                    }
                }),
                catchError((error) => {
                    console.error("Error deleting the pokemon", error);
                    return EMPTY;
                })
            )
        )
    ));
}