import { HeaderModule } from './../header/header.module';
import { FooterModule } from './../footer/footer.module';
import { ProfileMenuModule } from './../profile-menu/profile-menu.module';
import { OrderHistoryRoutingModule } from './order-history-routing.module';
import { OrderHistoryComponent } from './order-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ECommerceModule } from 'src/app/e-commerce/e-commerce.module';

@NgModule({
  declarations: [OrderHistoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrderHistoryRoutingModule,
    ProfileMenuModule,
    FooterModule,
    HeaderModule,
    ECommerceModule
  ]
})
export class OrderHistoryModule { }
