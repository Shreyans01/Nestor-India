import { ThankyouComponent } from './thankyou.component';
import { ThankyouRoutingModule } from './thankyou-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ThankyouComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThankyouRoutingModule
  ]
})
export class ThankyouModule { }
