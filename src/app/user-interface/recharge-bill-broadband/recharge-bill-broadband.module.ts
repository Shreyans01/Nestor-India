import { MobileAppLinkModule } from './../mobile-app-link/mobile-app-link.module';
import { SubHeaderModule } from './../sub-header/sub-header.module';
import { RechargeBillBroadbandComponent } from './recharge-bill-broadband.component';
import { RechargeBillBroadbandRoutingModule } from './recharge-bill-broadband-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [RechargeBillBroadbandComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RechargeBillBroadbandRoutingModule,
    SubHeaderModule,
    NgbModule,
    MobileAppLinkModule
  ]
})
export class RechargeBillBroadbandModule { }
