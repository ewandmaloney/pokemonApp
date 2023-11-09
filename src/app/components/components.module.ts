import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonTableComponent } from './pokemon-table/pokemon-table.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { SliderImagesPokemonComponent } from './slider-images-pokemon/slider-images-pokemon.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoadingComponent } from './loading/loading.component';
import { PipesModule } from '../pipes/pipes.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PokemonTableComponent,
    PokemonCardComponent,
    PokemonDetailsComponent,
    SliderImagesPokemonComponent,
    LoadingComponent,
    PageNotFoundComponent,
    LoginComponent,
  ],
  exports: [LoadingComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    PipesModule,
    RouterModule,
    FormsModule
  ]
})
export class ComponentsModule { }
