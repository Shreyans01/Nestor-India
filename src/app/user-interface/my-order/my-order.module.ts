import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyOrderRoutingModule } from './my-order-routing.module';
import { ECommerceModule } from 'src/app/e-commerce/e-commerce.module';
import { MyOrderComponent } from './my-order.component';
import { ProfileMenuModule } from '../profile-menu/profile-menu.module';


@NgModule({
  declarations: [MyOrderComponent],
  imports: [
  CommonModule,
    MyOrderRoutingModule,
    ECommerceModule,
    ProfileMenuModule
  ]
})
export class MyOrderModule { }
