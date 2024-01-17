import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PokemonDetailsResponse } from '../pages/pokemons/interfaces/PokemonDetailsResponse.interface';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { InfoDialogsService } from './info-dialogs.service';
import { Database, get, object, onValue, push, ref, remove, set } from '@angular/fire/database';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { setUser } from '../states/actions/user.action';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private database: Database = inject(Database)
  public firebaseData: any[] = [];
  public pokemons: any[] = [];
  public userPokedex!: string

  constructor(private http: HttpClient,
    private translateService: TranslateService,
    private LoginService: LoginService,
    private dialog: InfoDialogsService,
    private store: Store<AppState>,
    private logServ: LoginService) {
  }



  //Devuelve un observable con los datos de la pokedex
  leerDatosPokedex() {
    //Crear un reducer para recuperar el id del usuario
    this.store.select('user').subscribe((user) => {
      if (user) {
        let userPokedex = Object.values(user)
        this.userPokedex = userPokedex[0]
      }
    })
    if (this.userPokedex === '' || this.userPokedex === undefined) {
      this.userPokedex = this.logServ.getCookieId()!
      this.store.dispatch(setUser({ userId: this.userPokedex }))
    }
    let userId = (this.LoginService.getCookieId())
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
    }
    let userId = (this.LoginService.getCookieId())
    let isSaved;
    this.isPokemonAlreadySaved(pokemon).subscribe((res: any) => {
      isSaved = res;
      if (isSaved) {
        this.dialog.showError(this.translateService.instant('Error'), this.translateService.instant('This pokemon is already saved in your pokedex'));
        return;
      } else {
        //Añadir pokemon a la pokedex
        const dbRef = ref(this.database, `pokedex/${userId}/pokemons`)
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
    return pokedex;
  }

  isPokemonAlreadySaved(pokemon: PokemonDetailsResponse): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const { id } = pokemon;
      const userId = (this.LoginService.getCookieId())
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


  deletePokemonFromPokedex(id: number) {
    //ID usuario
    let userId = (this.LoginService.getCookieId())

    this.firebaseData.forEach((pkm: any) => {
      //Vuelve el objeto en un array
      let dataFirebase = Object.entries(pkm);
      //Recorro el array y siempre tiene 2 valores, 1 id firebase, 2 datos almacenados dentro
      dataFirebase.forEach((pkm: any) => {
        if (pkm[1].id === id) {
          let pokemon = pkm[0]
          //sweeet alert para confirmar
          this.dialog.showConfirmationDialog(this.translateService.instant('Confirm'), this.translateService.instant('Do you want to delete this pokemon?'), () => {
            const dbRef = ref(this.database, `pokedex/${userId}/pokemons/${pokemon}`)
            remove(dbRef)
            this.dialog.showSuccess(this.translateService.instant('Pokemon deleted'), `${pkm[1].name} ${this.translateService.instant('has been deleted from your pokedex')}`);
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
