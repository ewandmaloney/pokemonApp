import { createAction, props } from "@ngrx/store";
import { Pokedex } from "../app.state";

export const setUser = createAction('[Pokedex] Set User',
    props<{ userId: string }>()
);
