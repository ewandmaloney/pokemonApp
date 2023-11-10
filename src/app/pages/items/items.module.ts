import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemInfoComponent } from './item-info/item-info.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ItemInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ItemsModule { }
