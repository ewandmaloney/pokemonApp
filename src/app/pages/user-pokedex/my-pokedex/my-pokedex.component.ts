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
  public pkm: any

  constructor(private firebase: FirebaseService, private loginServ: LoginService) {

  }

  ngOnInit(): void {
    //Paso el email del usuario
    this.pokedexID = this.loginServ.getCookieUser()!;
    this.firebase.deletePruebas();
    this.firebase.readPokedex();
    // this.firebase.leerDatosPokedex().subscribe((res: any) => {
    //   this.pkm = this.firebase.pokemons;
    //   console.log(this.pkm)
    // });

  }



}
