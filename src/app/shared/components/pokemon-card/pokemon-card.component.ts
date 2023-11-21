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


  detailsPokemon(id: number) {
    this.detailPokemon.emit(id);
  }

  addPokemonToPokedex(pokemon: PokemonDetailsResponse) {
    //Post a la pokedex
    //this.firebase.deletePruebas();
    this.firebase.savePokemon(pokemon);
  }

  //Llevarme esta función a pokemon card (dentro de infinite scroll)
  deletePokemon(id: number) {
    this.firebase.deletePokemonFromPokedex(id);
    //Esto se hace para que no se quede colgando el pokemon en la vista
    for (let index = 0; index < this.pokemon.length; index++) {
      if (this.pokemon[index].id == id) {
        this.pokemon.splice(index, 1);
      }
    }
  }

}
