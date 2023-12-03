import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthInterceptorService } from './auth-interceptor.service';
import { ItemsService } from './items.service';
import { LocationService } from './location.service';
import { LoginService } from './login.service';
import { PokemonService } from './pokemon.service';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthInterceptorService,
    ItemsService,
    LocationService,
    LoginService,
    PokemonService,
    TranslateModule
  ]
})
export class ServicesModule { }
