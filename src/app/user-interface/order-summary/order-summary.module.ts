import { OrderSummaryRoutingModule } from './order-summary-routing.module';
import { OrderSummaryComponent } from './order-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [OrderSummaryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrderSummaryRoutingModule
  ]
})
export class OrderSummaryModule { }
