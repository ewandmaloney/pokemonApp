import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonDetailsResponse } from 'src/app/pages/pokemons/interfaces/PokemonDetailsResponse.interface';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.css']
})
export class InfiniteScrollComponent implements OnInit, OnChanges {


  public pokemons: PokemonDetailsResponse[] = [];
  public pokemonsCopy: any[] = [];
  public pages: number = 0;
  public actualPage: number = 1;
  public offset: number = 0;
  public limit: number = 20;
  public showGoUpButton: boolean = false;
  @Input() pokemonsCpy: any = []
  @Input() totalPokemons: number = 0;
  showScrollHeight: number = 400;
  hideScrollHeight: number = 200;

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

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this.pages = Math.ceil(this.totalPokemons / 20);
    this.offset = 0;
    this.limit = 20;
    this.addPokemons();
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

  //Dividir el array de pokemons en grupos de 20
  addPokemons() {
    this.pokemonsCopy = this.pokemonsCpy.slice(this.offset, this.limit);
    this.pokemons.push(...this.pokemonsCopy);
    this.limit = this.limit + 20;
    this.offset = this.offset + 20;
  }



}
