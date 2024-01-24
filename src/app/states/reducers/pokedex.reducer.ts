import { createReducer, on } from "@ngrx/store";
import { deletePokemon, loadPokedex, setPokedex } from "../actions/pokedex.action";

export const initialState = {
    pokemons: [] as any[]
}

export const pokedexReducer = createReducer(
    initialState,
    on(loadPokedex, (state) => ({ ...state })),
    on(setPokedex, (state, { pokemons }) => ({ ...state, pokemons })),
    on(deletePokemon, (state, { id }) => {
        const pokemonArray = Object.values(state.pokemons)
        const updatedPokemons = pokemonArray.filter((pokemon: any) => pokemon.id !== id);
        return { ...state, pokemons: updatedPokemons }
    })
);