import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PokemonDetailsResponse, Type } from '../interfaces/PokemonDetailsResponse.interface';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { InfoDialogsService } from 'src/app/services/info-dialogs.service';
import { Store } from '@ngrx/store';
import { AppState, Pokedex, UserPokedex } from 'src/app/states/app.state';
import { map } from 'rxjs';
import { addPokemon, loadPokedex } from 'src/app/states/actions/pokedex.action';
import { LoginService } from 'src/app/services/login.service';
import { setUser } from 'src/app/states/actions/user.action';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit, OnChanges {

  public userPokedex!: string

  public page: number = 1;
  public copyPokemons: PokemonDetailsResponse[] = [];
  public orderId: boolean = false;
  public orderName: boolean = false;
  public showGoUpButton: boolean = false;
  showScrollHeight: number = 400;
  hideScrollHeight: number = 200;

  @Input() limit: number = 10;
  @Input() totalPokemons!: number;
  @Input() pokemons: PokemonDetailsResponse[] = [];
  @Output() eventIdPokemon: EventEmitter<number> = new EventEmitter;
  @Output() eventPageNumber: EventEmitter<number> = new EventEmitter;
  @Output() eventLimit: EventEmitter<number> = new EventEmitter();

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if ((window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if (this.showGoUpButton &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop)
      < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

  constructor(private firebase: FirebaseService, private store: Store<AppState>) {

  }

  //Con esto compruebo si existen cambios en los datos de la llamada y me lo copio
  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemons']) {
      this.copyPokemons = changes['pokemons']?.currentValue;
    }
  }

  //Al crear el componente hago una copia de los pokemon para luego usarlo en la funcion searchPokemon  
  ngOnInit(): void {
    this.copyPokemons = this.pokemons;
  }

  //Mando un evento y le paso el id para ir al detalle del pokemon
  goToDetailsPokemon(id: number) {
    this.eventIdPokemon.emit(id);
  }

  addPokemonToPokedex(pokemon: PokemonDetailsResponse) {
    //Post a la pokedex
    //this.firebase.deletePruebas();

    //Mensaje de error y de success desde aqui
    const savePokemon =
    {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default,
    };
    this.store.dispatch(addPokemon({ pokemon: savePokemon }));
  }

  //Cambia de pagina y manda un evento al padre para llamar a la api
  changePage(page: number) {
    console.log(page)
    this.eventPageNumber.emit(page);
  }

  changeLimit(n: any) {
    let limit = n.target.value;
    this.eventLimit.emit(limit);
  }

  //Busca entre el array de pokemons
  searchPokemon(name: any) {
    const search = name.target.value;
    this.pokemons = this.copyPokemons.filter(pokemon => {
      return pokemon.name.toLocaleLowerCase().includes(search.toLowerCase());
    })
  }

  orderById() {
    if (this.orderId == false) {
      this.orderId = !this.orderId;
      this.pokemons = []
      this.pokemons = this.copyPokemons.sort((a, b) => (a.id > b.id ? -1 : 1));
    } else {
      this.orderId = !this.orderId;
      this.pokemons = []
      this.pokemons = this.copyPokemons.sort((a, b) => (a.id < b.id ? -1 : 1));
    }
  }

  orderByName() {
    if (this.orderName == false) {
      this.orderName = !this.orderName;
      this.pokemons = [];
      this.pokemons = this.copyPokemons.sort((a, b) => (a.name > b.name ? -1 : 1));
    } else {
      this.orderName = !this.orderName;
      this.pokemons = [];
      this.pokemons = this.copyPokemons.sort((a, b) => (a.name < b.name ? -1 : 1));
    }
  }

  scrollTop() {
    document.body.scrollTop = 0;  // Safari
    document.documentElement.scrollTop = 0; // Other
  }

}
