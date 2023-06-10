import { MobileAppLinkModule } from './../mobile-app-link/mobile-app-link.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RechargeBillLandlineComponent } from './recharge-bill-landline.component';
import { RechargeBillLandlineRoutingModule } from './recharge-bill-landline-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubHeaderModule } from '../sub-header/sub-header.module';

@NgModule({
  declarations: [RechargeBillLandlineComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RechargeBillLandlineRoutingModule,
    SubHeaderModule,
    NgbModule,
    MobileAppLinkModule
  ]
})
export class RechargeBillLandlineModule { }
