import { BookingBusConfirmDetailsComponent } from './booking-bus-confirm-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
    component: BookingBusConfirmDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingBusConfirmDetailsRoutingModule {}
