export interface AppState {
    user: string | undefined;
    pokedex: any
}

export interface UserPokedex {
    pokedex: Pokedex;
}

export interface Pokedex {
    pokemons: { [key: string]: Pokemon };
}

export interface Pokemon {
    id: number;
    image: string;
    name: string;
}
