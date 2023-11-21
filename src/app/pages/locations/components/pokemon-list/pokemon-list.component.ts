import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonDetailsResponse } from 'src/app/pages/pokemons/interfaces/PokemonDetailsResponse.interface';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit{

  @Input() pokemons: PokemonDetailsResponse[] = [];
  @Input() personalPokedex: boolean = false;

  constructor(private router: Router) {
   }

  ngOnInit(): void {
  }

  detailsPokemon(id: number) {
    this.router.navigate(['pokemons/pokemon', id]);
  }

}
