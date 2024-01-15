import { createReducer, on } from "@ngrx/store";
import { loadPokedex } from "../actions/pokedex.action";


export const initialState = {}

export const pokedexReducer = createReducer(
    initialState,
    on(loadPokedex, state => state),
);