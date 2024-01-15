import { createReducer, on } from "@ngrx/store";
import { loadPokedex, setPokedex, setUser } from "../actions/pokedex.action";
import { AppState } from "../app.state";


export const initialState: AppState = {
    user: undefined,
    pokedex: {},
}

export const pokedexReducer = createReducer(
    initialState,
    on(setUser, (state, { userId }) => ({ ...state, user: userId })),
    on(setPokedex, (state, { pokedex }) => ({ ...state, pokedex })),
);