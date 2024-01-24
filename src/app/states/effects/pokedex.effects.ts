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
                map((pokemons: any) => {
                    //Cambio la forma de recibir la pokedex para no mutar el state posteriormente
                    const pokemonsArray = Object.values(pokemons.pokemons)
                    return ({ type: '[Pokedex] Set Pokedex', pokemons: pokemonsArray })
                }),
                catchError((error) => {
                    console.error("Error cargando los pokemon", error)
                    return EMPTY
                })
            ))
    ))

    // @Effect()
    deletePokemon$ = createEffect(() => this.actions$.pipe(
        ofType('[Pokedex] Delete Pokemon'),
        exhaustMap(({ id }) => {
            return this.firebase.deletePokemonFromPokedex(id)
                .pipe(
                    take(1),
                    map(() => ({ type: '[Pokedex] Load Nothing Pokedex' })),
                    catchError((error) => {
                        console.error("Error eliminando el pokemon", error)
                        return EMPTY
                    })
                )
        })
    ), { dispatch: false });


    // @Effect()
    addPokemon$ = createEffect(() => this.actions$.pipe(
        ofType('[Pokedex] Add Pokemon'),
        exhaustMap(({ pokemon }) => {
            return this.firebase.savePokemon(pokemon)
                .pipe(
                    take(1),
                    map(() => ({ type: '[Pokedex] Load Nothing Pokedex' })),
                    catchError((error) => {
                        console.error("Error añadiendo el pokemon", error)
                        return EMPTY
                    })
                )
        })
    ), { dispatch: false }) 
}