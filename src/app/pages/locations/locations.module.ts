import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationInfoComponent } from './location-info/location-info.component';
import { RouterModule } from '@angular/router';

import { RegionComponent } from './region/region.component';
import { PokemonsModule } from '../pokemons/pokemons.module';
import { LocationsRoutingModule } from './locations-routing.module';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { InfiniteScrollComponent } from './components/infinite-scroll/infinite-scroll.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PokemonCardComponent } from '../../shared/components/pokemon-card/pokemon-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    LocationInfoComponent,
    RegionComponent,
    PokemonListComponent,
    InfiniteScrollComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LocationsRoutingModule,
    PipesModule,
    InfiniteScrollModule,
    SharedModule,
    TranslateModule
  ],
  exports:[
    InfiniteScrollComponent
  ]
})
export class LocationsModule { }
