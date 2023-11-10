import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PokemonDetailsResponse, Type } from '../interfaces/PokemonDetailsResponse.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

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


  @Input() totalPokemons!: number;
  @Input() pokemons: PokemonDetailsResponse[] = [];
  @Output() eventIdPokemon: EventEmitter<number> = new EventEmitter;
  @Output() eventPageNumber: EventEmitter<number> = new EventEmitter;

  constructor(private pokeService: PokemonService) {
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

  //Cambia de pagina y manda un evento al padre para llamar a la api
  changePage(page: number) {
    console.log(page)
    this.eventPageNumber.emit(page);
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
