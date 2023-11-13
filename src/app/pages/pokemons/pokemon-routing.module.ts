import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonTableComponent } from './pokemon-table/pokemon-table.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { authFnGuard } from 'src/app/guards/auth-fn.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all',
        component: PokemonTableComponent,
      },
      {
        path: 'pokemon/:id',
        component: PokemonDetailsComponent,
        canActivate: [authFnGuard]
      },
      {
        path: '**',
        redirectTo: 'all'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }
