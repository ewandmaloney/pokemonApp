import { createReducer, on } from "@ngrx/store";
import { addPokemon, deletePokemon, loadPokedex, setPokedex } from "../actions/pokedex.action";

export const initialState = {
    pokemons: [] as any[]
}

export const pokedexReducer = createReducer(
    initialState,
    on(loadPokedex, (state) => ({ ...state })),
    on(setPokedex, (state, { pokemons }) => ({ ...state, pokemons })),
    on(addPokemon, (state, { pokemon }) => {
        return {
            ...state,
            pokemons: {
                ...state.pokemons,
                [pokemon.id]: pokemon,
            },
        };
    }),
    on(deletePokemon, (state, { id }) => {
        const { [id]: deleted, ...pokemons } = state.pokemons;
        return {
            ...state,
            pokemons,
        };
    })
);