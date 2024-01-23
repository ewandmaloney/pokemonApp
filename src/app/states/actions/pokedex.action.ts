import { createAction, props } from "@ngrx/store";
import { PokemonState } from "../app.state";
import { PokemonDetailsResponse } from "src/app/pages/pokemons/interfaces/PokemonDetailsResponse.interface";

export const loadPokedex = createAction('[Pokedex] Load Pokedex');
export const setPokedex = createAction('[Pokedex] Set Pokedex',
    props<{ pokemons: PokemonState[] }>()
);
export const addPokemon = createAction('[Pokedex] Add Pokemon',
    props<{ pokemon: PokemonState }>()
);
export const deletePokemon = createAction('[Pokedex] Delete Pokemon',
    props<{ id: number }>()
);