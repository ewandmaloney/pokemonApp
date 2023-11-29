import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputFieldComponent } from 'src/app/components/forms/input-field/input-field.component';
import { RadioFieldComponent } from 'src/app/components/forms/radio-field/radio-field.component';
import { SelectFieldComponent } from 'src/app/components/forms/select-field/select-field.component';



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputFieldComponent,
    RadioFieldComponent,
    SelectFieldComponent
  ]
})
export class ResgisterModule { }
