import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { authFnGuard } from './guards/auth-fn.guard';
import { loginGuard } from './guards/login.guard';
import { LoginComponent } from './pages/login/login/login.component';
import { PageNotFoundComponent } from './pages/pokemons/page-not-found/page-not-found.component';
import { PokemonTableComponent } from './pages/pokemons/pokemon-table/pokemon-table.component';
import { PokemonDetailsComponent } from './pages/pokemons/pokemon-details/pokemon-details.component';
import { LocationInfoComponent } from './pages/locations/location-info/location-info.component';
import { RegionComponent } from './pages/locations/region/region.component';
import { ItemInfoComponent } from './pages/items/item-info/item-info.component';
import { MyPokedexComponent } from './pages/user-pokedex/my-pokedex/my-pokedex.component';

const routes: Routes = [
  // { path: 'pokemons', component: PokemonTableComponent, canActivate: [loginGuard] },
  // { path: 'pokemon/:id', component: PokemonDetailsComponent, canActivate: [authFnGuard, loginGuard] },
  // { path: 'locations', component: LocationInfoComponent, canActivate: [loginGuard] },
  // { path: 'region/:id', component: RegionComponent, canActivate: [loginGuard] },
  // { path: 'items', component: ItemInfoComponent, canActivate: [loginGuard] },
  // { path: 'login', component: LoginComponent },
  // { path: 'page-not-found', component: PageNotFoundComponent },
  // { path: '**', pathMatch: 'full', redirectTo: 'pokemons' },
  {
    path: 'pokemons',
    loadChildren: () => import('./pages/pokemons/pokemons.module').then(m => m.PokemonsModule),
    canActivateChild: [loginGuard]
  },
  {
    path: 'locations',
    loadChildren: () => import('./pages/locations/locations.module').then(m => m.LocationsModule),
    canActivateChild: [loginGuard]
  },
  {
    path: 'items',
    loadChildren: () => import('./pages/items/items.module').then(m => m.ItemsModule),
    canActivate: [loginGuard]
  },
  {
    path: 'my-pokedex',
    component: MyPokedexComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'pokemons'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
