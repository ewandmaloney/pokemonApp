import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PokemonDetailsResponse } from '../pages/pokemons/interfaces/PokemonDetailsResponse.interface';
import { Observable, map } from 'rxjs';
import { LoginService } from './login.service';
import { InfoDialogsService } from './info-dialogs.service';
import { TitleCasePipe } from '@angular/common';
import { Database, list, object, onValue, ref, remove, set } from '@angular/fire/database';
import { isEmpty } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private database: Database = inject(Database)
  public firebaseData: any[] = [];
  public pokemons: any[] = [];

  constructor(private http: HttpClient, private LoginService: LoginService, private dialog: InfoDialogsService) {
  }



  //Devuelve un observable con los datos de la pokedex
  leerDatosPokedex() {
    let userId = Number(this.LoginService.getCookieId())
    const dbRef = ref(this.database, `pokedex/${userId}`)
    return new Observable(observer => {
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        //Si no hay nada me devuelve null o undefined
        if (data === null || data === undefined) { observer.next([]); }
        observer.next(data)
        observer.complete();
      })
    })
  }


  //Emite directamente los valores en un void (Se vuelve a llamar si hay cambios en la pokedex)
  readPokedex() {
    let userId = Number(this.LoginService.getCookieId())
    const dbRef = ref(this.database, `pokedex/${userId}`)
    return onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      this.pokemons = data;
      console.log(this.pokemons)
    })
  }


  //Logica actualizada
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
        //Añadir pokemon a la pokedex
        const dbRef = ref(this.database, `pokedex/${userId}/pokemons/${pokemonSaved.id}`)
        set(dbRef, pokemonSaved)
        this.dialog.showSuccess('Pokemon saved', `${pokemon.name} has been added to your pokedex`);
      }
    });
  }

  // getPokedexFromUser() {
  //   let userId = Number(this.LoginService.getCookieId())
  //   return this.http.get(`https://angular-test-request-project-default-rtdb.europe-west1.firebasedatabase.app/pokedex/${userId}.json#`)
  //     .pipe(map((res: any) => this.createPokedexArray(res)))
  // }

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
      const userId = Number(this.LoginService.getCookieId())
      let isSaved = false;
      //Introduce un null de vez en cuando
      //AÑADIR IVYSAUR Y DESPUES VENUSAUR (DOBLE NULL) 
      this.leerDatosPokedex().subscribe((res: any) => {
        // console.log(isEmpty(res.pokemons[0]))
        // if (isEmpty(res.pokemons[0])) {
        //   const dbRef = ref(this.database, `pokedex/${userId}/pokemons/null`)
        //   remove(dbRef)
        //   res.pokemons.shift();
        // }
        const pokemons = Object.values(res);
        console.log(pokemons)
        pokemons.forEach((pkm: any) => {
          //Inicio en 1 porque el añadir bulbasur me añade un null
          for (let index = 0; index < pkm.length; index++) {
            console.log(pkm[index].id)
            if (pkm[index].id === id) {
              isSaved = true;
            }
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

    this.firebaseData.forEach((pkm: any) => {
      //Vuelve el objeto en un array
      let dataFirebase = Object.entries(pkm);
      //Recorro el array y siempre tiene 2 valores, 1 id firebase, 2 datos almacenados dentro
      dataFirebase.forEach((pkm: any) => {
        if (pkm[1].id === id) {
          let pokemon = pkm[0]
          //sweeet alert para confirmar
          this.dialog.showConfirmationDialog('Confirm', 'Do you want to delete this Pokémon?', () => {
            const dbRef = ref(this.database, `pokedex/${userId}/pokemons/${pokemon}`)
            remove(dbRef)
            this.dialog.showSuccess('Pokemon deleted', `${pkm[1].name} has been deleted from your pokedex`);
          });
        }
      })
    })
  }

  deletePruebas() {
    const dbRef = ref(this.database, `pokedex/`)
    remove(dbRef)
  }

}
