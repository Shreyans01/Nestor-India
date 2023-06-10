import { BookingBusConfirmDetailsComponent } from './booking-bus-confirm-details.component';
import { BookingBusConfirmDetailsRoutingModule } from './booking-bus-confirm-details-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BookingBusConfirmDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BookingBusConfirmDetailsRoutingModule
  ]
})
export class BookingBusConfirmDetailsModule { }
