import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonDetailsResponse } from 'src/app/pages/pokemons/interfaces/PokemonDetailsResponse.interface';
import { InfiniteScrollService } from './services/infinite-scroll.service';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { SpeciesReponse } from '../../interfaces/SpeciesReponse';
import { PokedexResponse, PokemonEntry } from '../../interfaces/PokedexResponse';
import { LocationService } from 'src/app/services/location.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.css'],
  providers: [
    { provide: InfiniteScrollService, useClass: InfiniteScrollService }
  ]
})
export class InfiniteScrollComponent implements OnInit, OnChanges {

  //Info de regions
  public speciesInfo: SpeciesReponse[] = [];
  public pokedexInfo: PokemonEntry[] = [];
  public pokedexPokemons: PokemonDetailsResponse[] = [];
  public resetLimit: number = 0;
  public totalPokemons: number = 0;
  public loading: boolean = false;
  public url: string = '';


  public pokemons: PokemonDetailsResponse[] = [];
  public pokemonsCpy: any[] = [];
  public pokemonsCopy: any[] = [];
  public pages: number = 0;
  public actualPage: number = 1;
  public offset: number = 0;
  public limit: number = 20;
  public showGoUpButton: boolean = false;
  @Input() pokedexID!: string;
  public pokedexId?: number;
  showScrollHeight: number = 400;
  hideScrollHeight: number = 200;
  ngUnsubscribe = new Subject<void>();


  @HostListener('window:scroll', [])
  onWindowScroll() {
    if ((window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if (this.showGoUpButton &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop)
      < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

  constructor(private infScr: InfiniteScrollService, private locServ: LocationService, private pokeServ: PokemonService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokedexID'] && changes['pokedexID'].currentValue) {
      this.resetValues();
      this.url = this.infScr.detectPokedexId(this.pokedexID);
      this.getInfoPokedex(this.url);
    }
  }

  ngOnInit(): void {



    //PokedexId
    // this.url = this.infScr.detectPokedexId(this.pokedexID);
    // this.getInfoPokedex(this.url);
    // this.offset = 0;
    // this.limit = 20;
  }

  //Crear un servicio que se encargue de hacer la petición de los pokemons


  getInfoPokedex(url: string) {
    this.locServ.getPokedex(url).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: PokedexResponse) => {
      this.loading = true;
      this.pokedexInfo = res.pokemon_entries;
      this.getInfoSpecies();
    })
  }

  getInfoSpecies() {
    const requests = this.pokedexInfo.map(res => this.pokeServ.getPokemonByQuery(res.pokemon_species.url));
    forkJoin(requests).pipe(takeUntil(this.ngUnsubscribe)).subscribe((responses: any[]) => {
      responses.forEach(res => {
        this.speciesInfo.push(res);
        this.speciesInfo.sort((a, b) => a.id - b.id);
      });
      this.getInfoPokemon();
      this.loading = false;
      this.totalPokemons = this.speciesInfo.length;
      console.log(this.pokedexPokemons)
    });
  }

  getInfoPokemon() {
    const requests = this.speciesInfo.map(res => this.pokeServ.getPokemonByQuery(res.varieties[0].pokemon.url)
      .pipe(takeUntil(this.ngUnsubscribe)));
    forkJoin(requests).subscribe((responses: PokemonDetailsResponse[]) => {
      this.pokedexPokemons = responses;
      this.pokedexPokemons.sort((a, b) => a.id - b.id);
      console.log(this.pokedexPokemons);
      this.totalPokemons = this.pokedexPokemons.length;
      this.pokemonsCpy = this.pokedexPokemons;
      this.pages = Math.ceil(this.totalPokemons / 20);
      this.addPokemons();
      this.loading = false;
    });
  }



  //Dividir el array de pokemons en grupos de 20
  addPokemons() {
    this.pokemonsCopy = this.pokemonsCpy.slice(this.offset, this.limit);
    this.pokemons.push(...this.pokemonsCopy);
    this.limit = this.limit + 20;
    this.offset = this.offset + 20;
  }

  onScroll() {
    if (this.actualPage <= this.pages) {
      this.addPokemons();
      this.actualPage++;
    }
  }

  scrollTop() {
    document.body.scrollTop = 0;  // Safari
    document.documentElement.scrollTop = 0; // Other
  }

  resetValues() {
    this.speciesInfo = [];
    this.pokedexPokemons = [];
    this.offset = 0;
    this.limit = 20;
    this.totalPokemons = 0;
    this.pages = 0;
    this.actualPage = 1;
    this.pokemons = [];
    this.pokemonsCpy = [];
    this.pokemonsCopy = [];
  }

}
