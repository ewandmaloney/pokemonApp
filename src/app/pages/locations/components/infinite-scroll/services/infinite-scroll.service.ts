import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class InfiniteScrollService {

  constructor(private http: HttpClient) {

  }

  //Comprobar si es un numero o un string el pokedexId
  //Teniendo en cuenta que es cada cosa, se gestiona todo aqui
  detectPokedexId(pokedexId: string) {
    let isNumber = pokedexId.split('/')

    if (Number(isNumber[6])) {
      return pokedexId;
    }
    return '';

  }


}
