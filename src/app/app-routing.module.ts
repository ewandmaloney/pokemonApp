import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonTableComponent } from './components/pokemon-table/pokemon-table.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { LocationInfoComponent } from './locations/location-info/location-info.component';
import { ItemInfoComponent } from './items/item-info/item-info.component';
import { RegionComponent } from './locations/region/region.component';
import { authGuard } from './auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { authFnGuard } from './guards/auth-fn.guard';
import { loginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: 'pokemons', component: PokemonTableComponent, canActivate: [loginGuard] },
  { path: 'pokemon/:id', component: PokemonDetailsComponent, canActivate: [authFnGuard, loginGuard] },
  { path: 'locations', component: LocationInfoComponent, canActivate: [loginGuard] },
  { path: 'region/:id', component: RegionComponent, canActivate: [loginGuard] },
  { path: 'items', component: ItemInfoComponent, canActivate: [loginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'pokemons' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
