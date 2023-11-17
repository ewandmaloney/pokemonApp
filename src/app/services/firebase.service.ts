import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonDetailsResponse } from '../pages/pokemons/interfaces/PokemonDetailsResponse.interface';
import { Observer, filter, map } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {



  constructor(private http: HttpClient, private LoginService: LoginService) {

  }


  savePokemon(pokemon: PokemonDetailsResponse) {
    const pokemonSaved = {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default
    }

    let userId = Number(this.LoginService.getCookieId())

    //A futuro: comprobar si el pokemon ya existe en la pokedex del usuario

    this.http.post(`https://angular-test-request-project-default-rtdb.europe-west1.firebasedatabase.app/pokedex/${userId}/pokemons.json`, pokemonSaved).subscribe(res => {
      alert('Pokemon guardado en la pokedex')
    })

  }

  getPokedexFromUser() {
    let userId = Number(this.LoginService.getCookieId())
    return this.http.get(`https://angular-test-request-project-default-rtdb.europe-west1.firebasedatabase.app/pokedex/${userId}.json#`)
  }

  isPokemonAlreadySaved(pokemon: PokemonDetailsResponse) {
    const { id } = pokemon
    let userId = Number(this.LoginService.getCookieId())

    //Llamar a la pokedex del usuario

    //Recorrer pokedex del usuario

  }

  deletePruebas() {
    this.http.delete('https://angular-test-request-project-default-rtdb.europe-west1.firebasedatabase.app/pokedex.json').subscribe(res => console.log(res))
  }

}
