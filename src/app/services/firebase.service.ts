import { Injectable, inject } from '@angular/core';
import { PokemonDetailsResponse } from '../pages/pokemons/interfaces/PokemonDetailsResponse.interface';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { InfoDialogsService } from './info-dialogs.service';
import { Database, get, onValue, push, ref, remove, set } from '@angular/fire/database';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { addPokemon, deletePokemon } from '../states/actions/pokedex.action';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private database: Database = inject(Database)
  public firebaseData: any[] = [];
  public pokemons: any[] = [];
  public userPokedex!: string

  constructor(private translateService: TranslateService,
    private LoginService: LoginService,
    private dialog: InfoDialogsService,
    private store: Store<AppState>) {
  }



  //Devuelve un observable con los datos de la pokedex
  leerDatosPokedex() {
    //Recuperar el id del usuario del state
    this.store.select('user')
      .subscribe((user) => {
        if (user) {
          let userPokedex = Object.values(user)
          this.userPokedex = userPokedex[0]
        }
      })
    let userId = this.userPokedex
    const dbRef = ref(this.database, `pokedex/${userId}`)
    return new Observable(observer => {
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        //Si no hay nada me devuelve null o undefined
        //if (data === null || data === undefined) { observer.next([]); }
        observer.next(data);
      })
    })
  }


  //Logica actualizada
  savePokemon(pokemon: PokemonDetailsResponse) {
    const pokemonSaved = {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default,
    };

    let userId = (this.LoginService.getCookieId())
    let isSaved;
    this.isPokemonAlreadySaved(pokemon).subscribe((res: any) => {
      isSaved = res;
      if (isSaved) {
        this.dialog.showError(this.translateService.instant('Error'), this.translateService.instant('This pokemon is already saved in your pokedex'));
        return;
      } else {
        //Añadir pokemon a la pokedex
        this.store.dispatch(addPokemon({ pokemon: pokemonSaved }));
        const dbRef = ref(this.database, `pokedex/${userId}/pokemons/${pokemon.id}`)
        get(dbRef).then((snapshot) => {
          if (snapshot.exists()) {
            push(dbRef, pokemonSaved);
          } else {
            set(dbRef, [pokemonSaved]);
          }
        });
        this.dialog.showSuccess(this.translateService.instant('Pokemon saved'), `${pokemon.name} ${this.translateService.instant('has been added to your pokedex')}`);
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
    return pokedex.flat();
  }

  isPokemonAlreadySaved(pokemon: PokemonDetailsResponse): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const { id } = pokemon;
      this.leerDatosPokedex().subscribe((res: any) => {
        if (!res) {
          observer.next(false);
          observer.complete();
          return;
        }
        const pokemons = Object.values(res);
        let isSaved = false;
        for (let i = 0; i < pokemons.length; i++) {
          const pkmArray = Object.values(pokemons[i] as object);
          let pokemonArray = pkmArray.flat();
          console.log(pokemonArray)
          for (let j = 0; j < pokemonArray.length; j++) {
            const pkm = pokemonArray[j];
            console.log(pkm)
            if (pkm.id === id) {
              isSaved = true;
              break; // Salir del bucle cuando se encuentra una coincidencia
            }
          }
          if (isSaved) {
            break; // Salir del bucle externo si ya se encontró una coincidencia
          }
        }
        observer.next(isSaved);
        observer.complete();
      }, error => {
        observer.error(Error('Error trying to obtain pokemon from pokedex'));
      });
    });
  }


  deletePokemonFromPokedex(id: number) {
    //ID usuario
    let userId = (this.LoginService.getCookieId())

    this.firebaseData.forEach((pkm: any) => {
      //Vuelve el objeto en un array
      let dataFirebase = Object.entries(pkm);
      //Recorro el array y siempre tiene 2 valores, 1 id firebase, 2 datos almacenados dentro
      dataFirebase.forEach((pkm: any) => {
        let id_pokemon = Number(pkm[0])
        if (id_pokemon === id) {
          let pokemon = pkm[0]
          //sweeet alert para confirmar
          this.dialog.showConfirmationDialog(this.translateService.instant('Confirm'), this.translateService.instant('Do you want to delete this pokemon?'), () => {
            const dbRef = ref(this.database, `pokedex/${userId}/pokemons/${pokemon}`)
            remove(dbRef)
            this.store.dispatch(deletePokemon({ id: pokemon }))
            this.dialog.showSuccess(this.translateService.instant('Pokemon deleted'), `${pokemon.name} ${this.translateService.instant('has been deleted from your pokedex')}`);
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
