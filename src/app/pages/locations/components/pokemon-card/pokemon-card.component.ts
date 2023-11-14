import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonDetailsResponse } from 'src/app/pages/pokemons/interfaces/PokemonDetailsResponse.interface';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
  
  @Input() pokemons : PokemonDetailsResponse[] = [];  
  
  constructor(private router: Router) { }
  

detailsPokemon(id: number) {
  this.router.navigate(['pokemons/pokemon', id]);
  }

}
