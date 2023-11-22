import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-my-pokedex',
  templateUrl: './my-pokedex.component.html',
  styleUrls: ['./my-pokedex.component.css'],
})
export class MyPokedexComponent implements OnInit {


  public pokemons: any[] = [];
  public firebaseData: any[] = [];
  public pokedexID: string = '';

  constructor(private firebase: FirebaseService, private loginServ: LoginService) {

  }

  ngOnInit(): void {
    //Paso el email del usuario
    this.pokedexID = this.loginServ.getCookieUser()!;
  }


  
}
