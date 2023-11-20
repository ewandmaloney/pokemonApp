import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-my-pokedex',
  templateUrl: './my-pokedex.component.html',
  styleUrls: ['./my-pokedex.component.css'],
})
export class MyPokedexComponent implements OnInit {

  public pokemons: any[] = [];
  public firebaseData: any[] = [];

  constructor(private firebase: FirebaseService) {

  }

  ngOnInit(): void {
    this.getPokemonsFromPokedex();
  }

  getPokemonsFromPokedex() {
    this.firebase.getPokedexFromUser().subscribe((res: any) => {
      
      this.pokemons = res;
    })
  }

}
