import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationInfoComponent } from './location-info/location-info.component';
import { RegionComponent } from './region/region.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all',
        component: LocationInfoComponent
      },
      {
        path: 'region/:id',
        component: RegionComponent
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
export class LocationsRoutingModule { }
