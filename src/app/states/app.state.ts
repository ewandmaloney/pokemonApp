export interface AppState {
    user: string | undefined;
    pokedex: {};
}

export interface Pokedex {
    id: number;
    name: string;
    image: string;
}
