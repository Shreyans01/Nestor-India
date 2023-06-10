import { MobileAppLinkModule } from './../mobile-app-link/mobile-app-link.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RechargeBillElectricityComponent } from './recharge-bill-electricity.component';
import { RechargeBillElectricityRoutingModule } from './recharge-bill-electricity-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubHeaderModule } from '../sub-header/sub-header.module';

@NgModule({
  declarations: [RechargeBillElectricityComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RechargeBillElectricityRoutingModule,
    SubHeaderModule,
    NgbModule,
    MobileAppLinkModule
  ]
})
export class RechargeBillElectricityModule { }
