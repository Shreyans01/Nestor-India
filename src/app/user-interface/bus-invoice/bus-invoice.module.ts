import { BusInvoiceComponent } from './bus-invoice.component';
import { BusInvoiceRoutingModule } from './bus-invoice-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BusInvoiceComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BusInvoiceRoutingModule
  ]
})
export class BusInvoiceModule { }
