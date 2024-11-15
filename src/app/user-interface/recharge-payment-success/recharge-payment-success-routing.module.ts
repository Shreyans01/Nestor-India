import { RechargePaymentSuccessComponent } from './recharge-payment-success.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
    component: RechargePaymentSuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RechargePaymentSuccessRoutingModule {}
