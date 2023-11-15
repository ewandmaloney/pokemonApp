import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonDetailsResponse } from 'src/app/pages/pokemons/interfaces/PokemonDetailsResponse.interface';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit{

  @Input() pokemons: PokemonDetailsResponse[] = [];

  constructor(private router: Router) {
   }

  ngOnInit(): void {
  }

  detailsPokemon(id: number) {
    this.router.navigate(['pokemons/pokemon', id]);
  }

}
