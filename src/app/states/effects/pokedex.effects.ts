import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { EMPTY, Observable, catchError, delay, exhaustMap, from, map, mergeMap, of, switchMap, take, tap } from "rxjs";
import { FirebaseService } from "src/app/services/firebase.service";
import { InfoDialogsService } from "src/app/services/info-dialogs.service";
import { AppState } from "../app.state";

@Injectable()
export class PokedexEffects {
    constructor(private actions$: Actions, private firebase: FirebaseService, private alert: InfoDialogsService, private store: Store<AppState>) { }

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

    // @Effect()
    addPokemon$ = createEffect(() => this.actions$.pipe(
        ofType('[Pokedex] Add Pokemon'),
        switchMap(({ pokemon }) =>
            this.store.select('pokedex').pipe(
                tap((pokemons: any) => {
                    let arrayPokemon = Object.values(pokemons.pokemons)
                    let pokemonArray = arrayPokemon.flat()
                    let pokemonSaved = pokemonArray.filter((p: any) => p.id === (pokemon as any).id);
                    if (pokemonSaved.length === 0 || pokemonSaved.length === 1) {
                        this.firebase.savePokemon(pokemon);
                        return { type: '[Pokedex] Load Pokedex' };
                    } else {
                        return { type: '[Pokedex] Save Pokemon Failed' };
                    }
                }),
                catchError((error) => {
                    console.error("Error adding the pokemon", error);
                    return EMPTY;
                })
            )
        )
    ))
}