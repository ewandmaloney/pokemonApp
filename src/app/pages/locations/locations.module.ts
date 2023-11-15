import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationInfoComponent } from './location-info/location-info.component';
import { RouterModule } from '@angular/router';

import { RegionComponent } from './region/region.component';
import { PokemonsModule } from '../pokemons/pokemons.module';
import { LocationsRoutingModule } from './locations-routing.module';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { InfiniteScrollComponent } from './components/infinite-scroll/infinite-scroll.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [
    LocationInfoComponent,
    RegionComponent,
    PokemonCardComponent,
    InfiniteScrollComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LocationsRoutingModule,
    PipesModule,
    InfiniteScrollModule
  ]
})
export class LocationsModule { }
