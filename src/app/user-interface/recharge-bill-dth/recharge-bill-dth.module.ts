import { MobileAppLinkModule } from './../mobile-app-link/mobile-app-link.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RechargeBillDthComponent } from './recharge-bill-dth.component';
import { RechargeBillDthRoutingModule } from './recharge-bill-dth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubHeaderModule } from '../sub-header/sub-header.module';

@NgModule({
  declarations: [RechargeBillDthComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RechargeBillDthRoutingModule,
    SubHeaderModule,
    NgbModule,
    MobileAppLinkModule
  ]
})
export class RechargeBillDthModule { }
