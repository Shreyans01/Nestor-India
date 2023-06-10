import { BusSeatBookingPaymentComponent } from './bus-seat-booking-payment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
    component: BusSeatBookingPaymentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusSeatBookingPaymentRoutingModule {}
