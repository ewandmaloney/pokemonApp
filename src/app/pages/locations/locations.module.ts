import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationInfoComponent } from './location-info/location-info.component';
import { RouterModule } from '@angular/router';

import { RegionComponent } from './region/region.component';
import { PokemonsModule } from '../pokemons/pokemons.module';
import { LocationsRoutingModule } from './locations-routing.module';



@NgModule({
  declarations: [
    LocationInfoComponent,
    RegionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LocationsRoutingModule
  ]
})
export class LocationsModule { }
