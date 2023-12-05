import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonDetailsResponse } from 'src/app/pages/pokemons/interfaces/PokemonDetailsResponse.interface';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  @Input() pokemons: PokemonDetailsResponse[] = [];
  @Input() personalPokedex: boolean = false;
  @Output() deletePokemonFromPokedex: EventEmitter<number> = new EventEmitter<number>();
  @Output() addPokemon: EventEmitter<PokemonDetailsResponse> = new EventEmitter<PokemonDetailsResponse>();

  constructor(private router: Router, private firebase: FirebaseService) {
  }

  ngOnInit(): void {
  }

  detailsPokemon(id: number) {
    this.router.navigate(['pokemons/pokemon', id]);
  }

  addPokemonToPokedex(pokemon: PokemonDetailsResponse) {
    this.addPokemon.emit(pokemon);
  }

  deletePokemon(id: number) {
    //Borrar pokemon de la pokedex
    this.deletePokemonFromPokedex.emit(id);
    this.firebase.deletePokemonFromPokedex(id);

  }

}
