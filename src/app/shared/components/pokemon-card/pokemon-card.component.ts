import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PokemonDetailsResponse } from 'src/app/pages/pokemons/interfaces/PokemonDetailsResponse.interface';
import { FirebaseService } from 'src/app/services/firebase.service';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { HoverPokemonDirective } from 'src/app/directives/hover-pokemon.directive';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, PipesModule, HoverPokemonDirective],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {

  constructor(private firebase: FirebaseService) { }

  @Input() personalPokedex: boolean = false;
  @Input() pokemon: any = {};
  @Output() detailPokemon: EventEmitter<number> = new EventEmitter();
  @Output() deletePokemon: EventEmitter<number> = new EventEmitter();
  @Output() addPokemon: EventEmitter<PokemonDetailsResponse> = new EventEmitter();


  detailsPokemon(id: number) {
    this.detailPokemon.emit(id);
  }

  addPokemonToPokedex(pokemon: PokemonDetailsResponse) {
    this.addPokemon.emit(pokemon);
  }

  //Llevarme esta función a pokemon card (dentro de infinite scroll)
  deletePokemonFirebase(id: number) {
    this.deletePokemon.emit(id);
  }

}
