import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonDetailsResponse } from 'src/app/pages/pokemons/interfaces/PokemonDetailsResponse.interface';
import { InfiniteScrollService } from './services/infinite-scroll.service';
import { Subject } from 'rxjs';
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


  public url: string = '';
  public pokemons: PokemonDetailsResponse[] = [];


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

  constructor(public infScr: InfiniteScrollService, private locServ: LocationService, private pokeServ: PokemonService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokedexID'] && changes['pokedexID'].currentValue) {
      this.infScr.detectPokedexId(this.pokedexID);
      this.pokemons = this.infScr.pokemons;
    }
  }

  ngOnInit(): void {

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


}
