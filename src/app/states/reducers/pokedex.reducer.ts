import { createReducer, on } from "@ngrx/store";
import { loadPokedex, setPokedex } from "../actions/pokedex.action";

export const initialState = {
    pokemons: [] as any[]
}

export const pokedexReducer = createReducer(
    initialState,
    on(loadPokedex, (state) => ({ ...state })),
    on(setPokedex, (state, { pokemons }) => ({ ...state, pokemons })),
);