import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import { CardsComponent } from './cards.component';
import { ECommerceModule } from './../../e-commerce/e-commerce.module';
import { ProfileMenuModule } from '../profile-menu/profile-menu.module';


@NgModule({
  declarations: [CardsComponent],
  imports: [
  CommonModule,
    CardsRoutingModule,
    ECommerceModule,
    ProfileMenuModule
  ]
})
export class CardsModule { }
