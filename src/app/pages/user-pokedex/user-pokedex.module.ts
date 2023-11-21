import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPokedexComponent } from './my-pokedex/my-pokedex.component';
import { LocationsModule } from '../locations/locations.module';



@NgModule({
  declarations: [
    MyPokedexComponent
  ],
  imports: [
    CommonModule,
    LocationsModule
  ]
})
export class UserPokedexModule { }
