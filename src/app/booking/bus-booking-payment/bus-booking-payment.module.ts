import { BusBookingPaymentComponent } from './bus-booking-payment.component';
import { BusBookingPaymentRoutingModule } from './bus-booking-payment-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BusBookingPaymentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BusBookingPaymentRoutingModule
  ]
})
export class BusBookingPaymentModule { }
