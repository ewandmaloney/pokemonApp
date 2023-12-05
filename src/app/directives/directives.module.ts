import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverPokemonDirective } from './hover-pokemon.directive';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HoverPokemonDirective
  ],
  exports: [
    HoverPokemonDirective
  ]
})
export class DirectivesModule { }
