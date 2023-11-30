import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPokedexComponent } from './my-pokedex/my-pokedex.component';
import { LocationsModule } from '../locations/locations.module';
import { HoverPokemonDirective } from 'src/app/directives/hover-pokemon.directive';



@NgModule({
  declarations: [
    MyPokedexComponent
  ],
  imports: [
    CommonModule,
    LocationsModule,
    HoverPokemonDirective,
  ],
  exports: [MyPokedexComponent]
})
export class UserPokedexModule { }
