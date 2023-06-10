import { BookingLayoutComponent } from './booking/booking-layout/booking-layout.component';
import { Error404Component } from './error404/error404.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentStatusComponent } from './e-commerce/payment-status/payment-status.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./e-commerce/e-commerce.module').then(
        (mod) => mod.ECommerceModule
      ),
  },

   { path: 'cashfree/callback', component: PaymentStatusComponent },


  /* {
    path: 'bill-payment',
    loadChildren: () =>
      import('./user-interface/user-interface.module').then(
        (mod) => mod.UserInterfaceModule
      ),
  }, */

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },

  /* { path: '**', component: Error404Component }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
    // routes, { onSameUrlNavigation: 'reload', initialNavigation: 'enabled' })
  exports: [RouterModule],
})
export class AppRoutingModule { }
