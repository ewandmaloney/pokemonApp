import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { DirectivesModule } from '../directives/directives.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';




@NgModule({
  declarations: [
    NavbarComponent,
  ],
  exports: [NavbarComponent, PokemonCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    PokemonCardComponent,
    TranslateModule
  ]
})
export class SharedModule { }
