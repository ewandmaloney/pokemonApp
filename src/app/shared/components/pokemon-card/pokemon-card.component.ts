import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PokemonDetailsResponse } from 'src/app/pages/pokemons/interfaces/PokemonDetailsResponse.interface';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, PipesModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {

  constructor(private firebase: FirebaseService) { }

  @Input() personalPokedex: boolean = false;
  @Input() pokemon: any = {};
  @Output() detailPokemon: EventEmitter<number> = new EventEmitter();
  @Output() deletePokemon: EventEmitter<number> = new EventEmitter();


  detailsPokemon(id: number) {
    this.detailPokemon.emit(id);
  }

  addPokemonToPokedex(pokemon: PokemonDetailsResponse) {
    //Post a la pokedex
    //this.firebase.deletePruebas();
    this.firebase.savePokemon(pokemon);
  }

  //Llevarme esta función a pokemon card (dentro de infinite scroll)
  deletePokemonFirebase(id: number) {
    this.deletePokemon.emit(id);
  }

}
