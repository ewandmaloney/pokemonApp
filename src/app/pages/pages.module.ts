import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsModule } from './items/items.module';
import { LocationsModule } from './locations/locations.module';
import { PokemonsModule } from './pokemons/pokemons.module';
import { LoginModule } from './login/login.module';
import { PagesRoutingModule } from './pages-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ItemsModule,
    LocationsModule,
    PokemonsModule,
    LoginModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
