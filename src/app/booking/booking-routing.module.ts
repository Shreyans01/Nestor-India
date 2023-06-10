import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'booking',
    loadChildren: () =>
      import('./booking-layout/booking-layout.module').then(
        (mod) => mod.BookingLayoutModule
      ),
  },
    // children: [
      {
        path: 'bus',
        loadChildren: () =>
      import('./busbooking/busbooking.module').then(
        (mod) => mod.BusbookingModule
      ), 
      },
      {
        path: 'busList',
        loadChildren: () =>
        import('./bus-list/bus-list.module').then(
          (mod) => mod.BusListModule
        ), 
      },
      {
        path: 'bookingBusConfirmDetails',
        loadChildren: () =>
        import('./booking-bus-confirm-details/booking-bus-confirm-details.module').then(
          (mod) => mod.BookingBusConfirmDetailsModule
        ),
      },
      {
        path: 'busSeatBookingPayment',
        loadChildren: () =>
        import('./bus-seat-booking-payment/bus-seat-booking-payment.module').then(
          (mod) => mod.BusSeatBookingPaymentModule
        ),
      },
      {
        path: 'busBookingPayment',
        loadChildren: () =>
        import('./bus-booking-payment/bus-booking-payment.module').then(
          (mod) => mod.BusBookingPaymentModule
        ),
      },
      {
        path: 'thankyou',
        loadChildren: () =>
        import('./thankyou/thankyou.module').then(
          (mod) => mod.ThankyouModule
        ),
      },
    // ],
  { path: '', redirectTo: '/booking/bus', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
