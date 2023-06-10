import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { ModalDialogModule } from '../modal-dialog/modal-dialog.module';
import { ShippingPolicyRoutingModule } from './shipping-policy-routing.module';
import { ShippingPolicyComponent } from './shipping-policy.component';
import { ECommerceModule } from 'src/app/e-commerce/e-commerce.module';

@NgModule({
  declarations: [ShippingPolicyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
    FooterModule,
    ModalDialogModule,
    ShippingPolicyRoutingModule,
    ECommerceModule,
  ]
})
export class ShippingPolicyModule { }
