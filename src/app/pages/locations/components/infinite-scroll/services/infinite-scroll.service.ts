import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokedexResponse, PokemonEntry } from '../../../interfaces/PokedexResponse';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { PokemonDetailsResponse } from 'src/app/pages/pokemons/interfaces/PokemonDetailsResponse.interface';
import { FirebaseService } from 'src/app/services/firebase.service';

@Injectable()
export class InfiniteScrollService {

  public pokedexInfo: PokemonEntry[] = [];
  public loading: boolean = false;
  private ngUnsubscribe = new Subject<void>();
  public pokedexPokemons: PokemonDetailsResponse[] = [];
  public totalPokemons: number = 0;
  public pages: number = 0;
  public pokemonsCopy: PokemonDetailsResponse[] = [];
  public pokemons: PokemonDetailsResponse[] = [];
  public limit: number = 20;
  public offset: number = 0;
  public actualPage: number = 1;
  public personalPokedex: boolean = false;


  constructor(private http: HttpClient,
    private locServ: LocationService,
    private pokeServ: PokemonService,
    private firebase: FirebaseService) {

  }

  //Comprobar si es un numero o un string el pokedexId
  //Teniendo en cuenta que es cada cosa, se gestiona todo aqui
  detectPokedexId(pokedexId: string) {
    let isNumber = pokedexId.split('/')

    if (Number(isNumber[6])) {
      this.personalPokedex = false;
      this.showPokemonList(pokedexId);
    } else {
      this.personalPokedex = true;
      this.showPersonalPokedex();
    }

  }

  showPersonalPokedex() {
    this.resetValues();
    this.firebase.leerDatosPokedex().subscribe((res: any) => {
      let data = this.firebase.createPokedexArray(res);
      this.loading = true;
      this.pokedexPokemons = data;
      this.pokedexPokemons.sort((a, b) => a.id - b.id);
      this.totalPokemons = this.pokedexPokemons.length;
      //paginas
      this.pages = Math.ceil(this.totalPokemons / 20);
      this.addPokemons();
      this.loading = false;
    })

  }

  showPokemonList(url: string) {
    this.resetValues();
    this.getInfoPokedex(url);
  }


  getInfoPokedex(url: string) {
    this.locServ.getPokedex(url).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: PokedexResponse) => {
      this.loading = true;
      this.pokedexInfo = res.pokemon_entries;
      this.getInfoPokemon();
    })
  }

  getInfoPokemon() {
    let value = this.pokedexInfo.map((val) => {
      return (val.pokemon_species.url = val.pokemon_species.url.split('/')[6]);
    });
    const req = value.map(id => this.pokeServ.getPokemonById(+id).pipe(takeUntil(this.ngUnsubscribe)));
    forkJoin(req).subscribe((responses: PokemonDetailsResponse[]) => {
      this.pokedexPokemons = responses;
      this.pokedexPokemons.sort((a, b) => a.id - b.id);
      this.totalPokemons = this.pokedexPokemons.length;
      this.pages = Math.ceil(this.totalPokemons / 20);
      this.addPokemons();
      this.loading = false;
    });
  }

  addPokemons() {
    this.pokemonsCopy = this.pokedexPokemons.slice(this.offset, this.limit);
    this.pokemons.push(...this.pokemonsCopy);
    this.limit = this.limit + 20;
    this.offset = this.offset + 20;
  }

  resetValues() {
    this.pokedexPokemons = [];
    this.offset = 0;
    this.limit = 20;
    this.totalPokemons = 0;
    this.pages = 0;
    this.actualPage = 1;
    this.pokemons = [];
    this.pokemonsCopy = [];
  }


}
