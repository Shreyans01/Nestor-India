import { MyBusBookingsRoutingModule } from './my-bus-bookings-routing.module';
import { MyBusBookingsComponent } from './my-bus-bookings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MyBusBookingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyBusBookingsRoutingModule
  ]
})
export class MyBusBookingsModule { }
