import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonDetailsResponse } from 'src/app/pages/pokemons/interfaces/PokemonDetailsResponse.interface';
import { InfiniteScrollService } from './services/infinite-scroll.service';
import { Subject, Subscription } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/states/app.state';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.css'],
  providers: [
    { provide: InfiniteScrollService, useClass: InfiniteScrollService }
  ]
})
export class InfiniteScrollComponent implements OnInit, OnChanges {


  public url: string = '';
  public pokemons: PokemonDetailsResponse[] = [];


  public showGoUpButton: boolean = false;
  public personalPokedex: boolean = false;
  @Input() pokedexID!: string;
  public pokedexId?: number;
  showScrollHeight: number = 400;
  hideScrollHeight: number = 200;
  ngUnsubscribe = new Subject<void>();
  pokemonInfoSubscription?: Subscription;


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

  constructor(public infScr: InfiniteScrollService, private locServ: LocationService, private pokeServ: PokemonService, private firebase: FirebaseService, private store: Store<AppState>) {
  }

  ngOnDestroy(): void {
    this.pokemonInfoSubscription?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (changes['pokedexID'] && changes['pokedexID'].currentValue) {
      if (this.pokedexID.split('/').length < 7) {
        this.personalPokedex = true;
        this.pokemonInfoSubscription = this.store.select('pokedex')
          .subscribe((res) => {
            console.log(res)
            this.pokemons = this.firebase.createPokedexArray(res);
            console.log(this.pokemons)
            this.pokemons.sort((a, b) => a.id - b.id);
          })
      } else {
        this.infScr.detectPokedexId(this.pokedexID);
        this.pokemons = this.infScr.pokemons;
        this.personalPokedex = this.infScr.personalPokedex;
      }
      //Solo se llama una vez, detecta el pokedexID y ya
      console.log(this.pokemons)
      console.log(this.personalPokedex)
    }
  }

  ngOnInit(): void {
    //Si es una pokedex de pokeApi esta se divide en 7 partes por eso la condicion
  }


  onScroll() {
    if (this.infScr.actualPage <= this.infScr.pages) {
      this.infScr.addPokemons();
      this.pokemons = this.infScr.pokemons;
      this.infScr.actualPage++;
    }
  }

  scrollTop() {
    document.body.scrollTop = 0;  // Safari
    document.documentElement.scrollTop = 0; // Other
  }

  addPokemonToPokedex(pokemon: PokemonDetailsResponse) {
    this.firebase.savePokemon(pokemon);
  }

  deletePokemonFromPokedex(id: number) {
    this.firebase.deletePokemonFromPokedex(id);
  }
}
