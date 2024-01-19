import { Action, ActionReducer, ActionReducerMap, createReducer, on } from "@ngrx/store";
import { setUser } from "../actions/user.action";
import { AppState } from "../app.state";
import { pokedexReducer } from "./pokedex.reducer";


export const initialState = {
    user: '',
}

export const userReducer = createReducer(
    initialState,
    on(setUser, (state, { userId }) => ({ ...state, user: userId })),
);

