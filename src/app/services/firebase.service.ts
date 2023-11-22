import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonDetailsResponse } from '../pages/pokemons/interfaces/PokemonDetailsResponse.interface';
import { Observable, map } from 'rxjs';
import { LoginService } from './login.service';
import { InfoDialogsService } from './info-dialogs.service';
import { TitleCasePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public firebaseData: any[] = [];

  constructor(private http: HttpClient, private LoginService: LoginService, private dialog: InfoDialogsService) {
  }

  savePokemon(pokemon: PokemonDetailsResponse) {
    const pokemonSaved = {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default,
    }
    let userId = Number(this.LoginService.getCookieId())

    let isSaved;
    this.isPokemonAlreadySaved(pokemon).subscribe((res: any) => {
      isSaved = res;
      if (isSaved) {
        this.dialog.showError('Error', 'El pokemon ya está guardado en la pokedex');
        return;
      } else {
        this.http.post(`https://angular-test-request-project-default-rtdb.europe-west1.firebasedatabase.app/pokedex/${userId}/pokemons.json`, pokemonSaved).subscribe(res => {
          this.dialog.showSuccess('Pokemon guardado', 'El pokemon se ha guardado en la pokedex');
        })
      }
    });
  }

  getPokedexFromUser() {
    let userId = Number(this.LoginService.getCookieId())
    return this.http.get(`https://angular-test-request-project-default-rtdb.europe-west1.firebasedatabase.app/pokedex/${userId}.json#`)
      .pipe(map((res: any) => this.createPokedexArray(res)))
  }

  createPokedexArray(pokedexObj: any) {
    let pokedex: any[] = []
    if (pokedexObj) {
      this.firebaseData = Object.values(pokedexObj)
      const data: any[] = Object.values(pokedexObj)
      if (pokedexObj === null) { return []; }
      data.forEach((pkm: any) => {
        pokedex = Object.values(pkm)
      })
    }
    return pokedex;
  }

  isPokemonAlreadySaved(pokemon: PokemonDetailsResponse): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const { id } = pokemon;
      let isSaved = false;
      this.getPokedexFromUser().subscribe((res: any) => {
        const pokemons = Object.values(res);
        pokemons.forEach((pkm: any) => {
          if (pkm.id === id) {
            isSaved = true;
          }
        });
        observer.next(isSaved);
        observer.complete();
        observer.error(Error('Error trying to obtain pokemon from pokedex'));
      });
    });
  }


  deletePokemonFromPokedex(id: number) {
    //ID usuario
    let userId = Number(this.LoginService.getCookieId())

    //No es necesario hacer get a la pokedex    
    console.log(id)
    //Recuperar el id del firebase
    console.log(this.firebaseData)

    this.firebaseData.forEach((pkm: any) => {

      //Vuelve el objeto en un array
      let dataFirebase = Object.entries(pkm);

      //Recorro el array y siempre tiene 2 valores, 1 id firebase, 2 datos almacenados dentro
      dataFirebase.forEach((pkm: any) => {
        if (pkm[1].id === id) {
          let pokemon = pkm[0]
          //sweeet alert para confirmar
          this.dialog.showConfirmationDialog('Confirm', 'Do you want to delete this Pokémon?', () => {
            this.http.delete(`https://angular-test-request-project-default-rtdb.europe-west1.firebasedatabase.app/pokedex/${userId}/pokemons/${pokemon}.json`).subscribe(res => {
              this.dialog.showSuccess('Pokemon deleted', `${pkm[1].name} has been deleted from your pokedex`);
            })
          });
        }
      })
    })
  }

  deletePruebas() {
    this.http.delete('https://angular-test-request-project-default-rtdb.europe-west1.firebasedatabase.app/pokedex.json').subscribe(res => console.log(res))
  }

}
