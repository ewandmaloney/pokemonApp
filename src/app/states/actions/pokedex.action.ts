import { createAction, props } from "@ngrx/store";
import { Pokedex } from "../app.state";

export const loadPokedex = createAction('[Pokedex] Load Pokedex');
export const setPokedex = createAction('[Pokedex] Set Pokedex',
    props<{ pokedex: any[] }>()
);
// export const addPokemon = createAction('[Pokedex] Add Pokemon',
//     props<{ pokemon: any }>()
// );
// export const deletePokemon = createAction('[Pokedex] Delete Pokemon',
//     props<{ pokemon: any }>()
// );