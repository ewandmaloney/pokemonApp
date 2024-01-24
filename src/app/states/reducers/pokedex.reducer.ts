import { createReducer, on } from "@ngrx/store";
import { addPokemon, deletePokemon, loadPokedex, setPokedex } from "../actions/pokedex.action";

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
    }),
    on(addPokemon, (state, { pokemon }) => {
        const pokemonArray = Object.values(state.pokemons)
        const pokemonExists = pokemonArray.find((p: any) => p.id === pokemon.id);
        if (pokemonExists) {
            return { ...state }
        }
        const updatedPokemons = [...pokemonArray, pokemon];
        return { ...state, pokemons: updatedPokemons }
    })
);