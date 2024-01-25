import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, catchError, exhaustMap, map, of, switchMap, take, tap } from "rxjs";
import { FirebaseService } from "src/app/services/firebase.service";
import { deletePokemon } from "../actions/pokedex.action";

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
    deletePokemon$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(deletePokemon),
                tap(({ id }) => {
                    this.firebase.deletePokemonFromPokedex(id).subscribe({
                        complete: () => {
                            console.info('Pokemon eliminado con éxito');
                        },
                        error: (error) => {
                            console.error('Error eliminando el pokemon', error);
                        },
                    });
                })
            ),
        { dispatch: false }
    );
}