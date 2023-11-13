import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetailsResponse } from '../interfaces/PokemonDetailsResponse.interface';
import { PokemonResponse } from '../interfaces/PokemonResponse';
import { Subscription, from, take } from 'rxjs';
@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.css'],
})
export class PokemonTableComponent implements OnInit, OnDestroy {
  public pokemonNoInfo: any = {};
  public pokemons: PokemonDetailsResponse[] = [];
  public limit: number = 10;
  public offset: number = 0;
  public totalPokemons: number = 0;
  public page: number = 0;
  pokemonInfoSubscription?: Subscription;

  constructor(private pokeService: PokemonService, private router: Router) { }

  ngOnDestroy(): void {
    this.pokemonInfoSubscription?.unsubscribe();
    console.log('Desuscrito');
  }

  ngOnInit(): void {
    this.getPokemonResults();
  }

  getPokemonById(id: number) {
    this.router.navigate(['pokemons/pokemon', id]);
  }

  getPokemonResults() {
    this.pokeService
      .getPokemons(this.limit, this.offset)
      .pipe(take(1))
      .subscribe((pokemons: PokemonResponse) => {
        this.pokemonNoInfo = pokemons;
        this.totalPokemons = this.pokemonNoInfo.count;
        this.getPokemonsInfo();
        console.log(this.pokemons);
      });
  }

  getPokemonsInfo() {
    /*Con from creo un observable a partir de un array y con take(1) indico que solo me devuelva 1 resultado
     */
    from(this.pokemonNoInfo.results).forEach((pokemon: any) => {
      this.pokemonInfoSubscription = this.pokeService
        .getPokemonByQuery(pokemon.url)
        .subscribe((resp: PokemonDetailsResponse) => {
          this.pokemons.push(resp);
          this.pokemons.sort((a, b) => a.id - b.id);
        });
    });
  }

  changeLimit(limit: number) {
    this.limit = limit;
    this.pokemons = [];
    this.getPokemonResults();
  }

  changePage(n: number) {
    this.page = n;
    this.offset = this.page * this.limit - this.limit;
    this.pokemons = [];
    this.getPokemonResults();
  }
}