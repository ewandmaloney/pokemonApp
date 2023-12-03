import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonTableComponent } from './pokemon-table/pokemon-table.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { SliderImagesPokemonComponent } from './slider-images-pokemon/slider-images-pokemon.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoadingComponent } from './loading/loading.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login/login.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    PokemonTableComponent,
    PokemonCardComponent,
    PokemonDetailsComponent,
    SliderImagesPokemonComponent,
    LoadingComponent,
    PageNotFoundComponent,
  ],
  exports: [LoadingComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    PipesModule,
    RouterModule,
    FormsModule,
    PokemonRoutingModule,
    TranslateModule
  ]
})
export class PokemonsModule { }
