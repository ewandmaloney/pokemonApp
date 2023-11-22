import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PokemonDetailsResponse, Type } from '../interfaces/PokemonDetailsResponse.interface';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { InfoDialogsService } from 'src/app/services/info-dialogs.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit, OnChanges {


  public page: number = 1;
  public copyPokemons: PokemonDetailsResponse[] = [];
  public orderId: boolean = false;
  public orderName: boolean = false;

  @Input() limit: number = 10;
  @Input() totalPokemons!: number;
  @Input() pokemons: PokemonDetailsResponse[] = [];
  @Output() eventIdPokemon: EventEmitter<number> = new EventEmitter;
  @Output() eventPageNumber: EventEmitter<number> = new EventEmitter;
  @Output() eventLimit: EventEmitter<number> = new EventEmitter();

  constructor(private pokeService: PokemonService, private firebase: FirebaseService, private dialog : InfoDialogsService) {
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
    this.firebase.savePokemon(pokemon);
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


}
