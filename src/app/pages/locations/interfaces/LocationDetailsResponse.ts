export interface LocationDetailsResponse {
    areas:        Region[];
    game_indices: GameIndex[];
    id:           number;
    name:         string;
    names:        Name[];
    region:       Region;
}

export interface Region {
    name: string;
    url:  string;
}

export interface GameIndex {
    game_index: number;
    generation: Region;
}

export interface Name {
    language: Region;
    name:     string;
}
