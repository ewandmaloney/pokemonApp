import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoginService } from 'src/app/services/login.service';
import { AppState } from 'src/app/states/app.state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-my-pokedex',
  templateUrl: './my-pokedex.component.html',
  styleUrls: ['./my-pokedex.component.css'],
})
export class MyPokedexComponent implements OnInit {


  public pokemons: any[] = [];
  public firebaseData: any[] = [];
  public pokedexID: string = '';
  public pkm: any
  public idUser: string[] = [];

  constructor(private firebase: FirebaseService, private loginServ: LoginService, private store: Store<AppState>) {
    this.store.select('user').pipe(takeUntilDestroyed()).subscribe((user) => {
      if (user) {
        this.idUser = Object.values(user);
      }
    });
  }

  ngOnInit(): void {
    //Paso el email del usuario
    if (this.idUser[0] === '' || this.idUser === undefined) {
      this.pokedexID = this.loginServ.getCookieUser()!;
    } else {
      this.pokedexID = this.idUser[0]!;
    }
    //this.firebase.deletePruebas();
    // this.firebase.readPokedex();
  }
}
