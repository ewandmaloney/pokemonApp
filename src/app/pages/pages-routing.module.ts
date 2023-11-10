import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from '../guards/login.guard';
import { LoginComponent } from './login/login/login.component';
import { PageNotFoundComponent } from './pokemons/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pokemons',
        loadChildren: () => import('./pokemons/pokemons.module').then(m => m.PokemonsModule),
        canActivateChild: [loginGuard]
      },
      {
        path: 'locations',
        loadChildren: () => import('./locations/locations.module').then(m => m.LocationsModule),
        canActivateChild: [loginGuard]
      },
      {
        path: 'items',
        loadChildren: () => import('./items/items.module').then(m => m.ItemsModule),
        canActivate: [loginGuard]
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'page-not-found',
        component: PageNotFoundComponent,
        canActivate: [loginGuard]
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
