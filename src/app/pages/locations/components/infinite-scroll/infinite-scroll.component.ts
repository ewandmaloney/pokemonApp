import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonDetailsResponse } from 'src/app/pages/pokemons/interfaces/PokemonDetailsResponse.interface';
import { InfiniteScrollService } from './services/infinite-scroll.service';
import { Subject, Subscription } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/states/app.state';
import { addPokemon, deletePokemon } from 'src/app/states/actions/pokedex.action';
import { InfoDialogsService } from 'src/app/services/info-dialogs.service';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(public infScr: InfiniteScrollService, private firebase: FirebaseService, private store: Store<AppState>, private infoDialog: InfoDialogsService, private translateService: TranslateService) {
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
            this.pokemons = this.firebase.createPokedexArray(res);
            this.pokemons.sort((a, b) => a.id - b.id);
          })
      } else {
        this.infScr.detectPokedexId(this.pokedexID);
        this.pokemons = this.infScr.pokemons;
        this.personalPokedex = this.infScr.personalPokedex;
      }
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
    const savePokemon = {
      id: pokemon.id, 
      name: pokemon.name,
      image: pokemon.sprites.front_default,
    }
    this.store.dispatch(addPokemon({ pokemon: savePokemon }));
  }

  deletePokemonFromPokedex(id: number) {
    this.infoDialog.showConfirmationDialog('Delete Pokemon', 'Are you sure you want to delete this pokemon from your pokedex?', () => {
      this.store.dispatch(deletePokemon({ id: id }));
      this.infoDialog.showSuccess(this.translateService.instant('Pokemon deleted'), this.translateService.instant('The pokemon has been deleted from your pokedex'));

    });
  }
}
