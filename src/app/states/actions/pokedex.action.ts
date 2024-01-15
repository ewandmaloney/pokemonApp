import { createAction, props } from "@ngrx/store";
import { Pokedex } from "../app.state";

export const loadPokedex = createAction('[Pokedex] Load Pokedex');
export const setUser = createAction('[Pokedex] Set User',
    props<{ userId: string | undefined }>()
);
export const setPokedex = createAction('[Pokedex] Set Pokedex',
    props<{ pokedex: Pokedex }>()
);