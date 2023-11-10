export interface RegionDetailsResponse {
    id:              number;
    locations:       MainGeneration[];
    main_generation: MainGeneration | null;
    name:            string;
    names:           Name[];
    pokedexes:       MainGeneration[];
    version_groups:  MainGeneration[];
}

export interface MainGeneration {
    name: string;
    url:  string;
}

export interface Name {
    language: MainGeneration;
    name:     string;
}
