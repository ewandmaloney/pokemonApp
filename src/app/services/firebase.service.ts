import { Injectable, inject } from '@angular/core';
import { PokemonDetailsResponse } from '../pages/pokemons/interfaces/PokemonDetailsResponse.interface';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { InfoDialogsService } from './info-dialogs.service';
import { Database, get, onValue, push, ref, remove, set } from '@angular/fire/database';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState, PokemonState } from '../states/app.state';

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
  savePokemon(pokemon: PokemonState): Observable<boolean> {
    return new Observable<boolean>(observer => {
      let userId = this.userPokedex
      let isSaved;

      this.isPokemonAlreadySaved(pokemon).subscribe((res: any) => {
        isSaved = res;
        if (isSaved) {
          this.dialog.showError(
            this.translateService.instant('Error'),
            this.translateService.instant('This pokemon is already saved in your pokedex')
          );
          observer.next(false); // Notify the observer that the save operation failed
          observer.complete(); // Complete the observable
          return;
        } else {
          // Añadir pokemon a la pokedex
          const dbRef = ref(this.database, `pokedex/${userId}/pokemons`);
          get(dbRef)
            .then((snapshot) => {
              if (snapshot.exists()) {
                push(dbRef, pokemon);
              } else {
                set(dbRef, [pokemon]);
              }
              this.dialog.showSuccess(
                this.translateService.instant('Pokemon saved'),
                `${pokemon.name} ${this.translateService.instant('has been added to your pokedex')}`
              );
              observer.next(true); // Notify the observer that the save operation was successful
              observer.complete(); // Complete the observable
            })
            .catch((error) => {
              observer.error(error); // Notify the observer if there was an error
              observer.complete(); // Complete the observable
            });
        }
      });
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
      //this.firebaseData = Object.values(pokedexObj)
      const data: any[] = Object.values(pokedexObj)
      if (pokedexObj === null) { return []; }
      data.forEach((pkm: any) => {
        pokedex = Object.values(pkm)
      })
    }
    return pokedex;
  }

  isPokemonAlreadySaved(pokemon: PokemonState): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const { id } = pokemon;
      let isSaved = false;
      this.leerDatosPokedex().subscribe((res: any) => {
        if (!res) { observer.next(false); observer.complete(); return; }
        const pokemons = Object.values(res);
        pokemons.forEach((pkm: any) => {
          const pkmArray = Object.values(pkm);
          for (let index = 0; index < pkmArray.length; index++) {
            if ((pkmArray[index] as any).id === id) {
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


  deletePokemonFromPokedex(id: number): Observable<void> {
    return new Observable<void>(observer => {
      // ID usuario
      let userId = this.userPokedex;
      this.leerDatosPokedex().subscribe((res: any) => {
        this.firebaseData = Object.values(res);
        this.firebaseData.forEach((pkm: any) => {
          // Vuelve el objeto en un array
          let dataFirebase = Object.entries(pkm);
          // Recorro el array y siempre tiene 2 valores, 1 id firebase, 2 datos almacenados dentro
          dataFirebase.forEach((pkm: any) => {
            let id_pokemon = pkm[1].id;
            if (id_pokemon === id) {
              let pokemon = pkm[0];
              const dbRef = ref(this.database, `pokedex/${userId}/pokemons/${pokemon}`);
              remove(dbRef)
                .then(() => {
                  observer.next();
                  observer.complete();
                })
                .catch(error => {
                  observer.error(error);
                  observer.complete();
                });
            }
          });
        });
      });
    });
  }

  deletePruebas() {
    const dbRef = ref(this.database, `pokedex/`)
    remove(dbRef)
  }

}
