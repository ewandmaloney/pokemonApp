import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonResponse } from '../components/interfaces/PokemonResponse';
import { Observable } from 'rxjs';
import { PokemonDetailsResponse } from '../components/interfaces/PokemonDetailsResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemons(limit: number, offset: number): Observable<PokemonResponse> {
    return this.http.get<PokemonResponse>(`${baseUrl}pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemonById(id: number): Observable<PokemonDetailsResponse> {
    return this.http.get<PokemonDetailsResponse>(`${baseUrl}pokemon/${id}`);
  }

  getPokemonByQuery(query: string): Observable<PokemonDetailsResponse> {
    return this.http.get<PokemonDetailsResponse>(query);
  }

  pokemonType(id: number): Observable<boolean> {
    return new Observable<boolean>(observer => {
      let isFireType = false;
      this.getPokemonById(id).subscribe(pokemon => {
        const types = pokemon.types;
        for (let index = 0; index < types.length; index++) {
          if (types[index].type.name.includes('fire')) {
            isFireType = true;
            break;
          }
        }
        observer.next(isFireType);
        observer.complete();
      }, error => {
        // Manejar errores si es necesario
        observer.error(error);
      });
    });
  }

}

const baseUrl: string = 'https://pokeapi.co/api/v2/';
