import { RechargePaymentSuccessComponent } from './recharge-payment-success.component';
import { RechargePaymentSuccessRoutingModule } from './recharge-payment-success-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RechargePaymentSuccessComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RechargePaymentSuccessRoutingModule
  ]
})
export class RechargePaymentSuccessModule { }
