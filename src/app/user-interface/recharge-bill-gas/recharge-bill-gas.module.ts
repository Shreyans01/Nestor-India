import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RechargeBillGasComponent } from './recharge-bill-gas.component';
import { RechargeBillGasRoutingModule } from './recharge-bill-gas-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubHeaderModule } from '../sub-header/sub-header.module';
import { MobileAppLinkModule } from '../mobile-app-link/mobile-app-link.module';

@NgModule({
  declarations: [RechargeBillGasComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RechargeBillGasRoutingModule,
    SubHeaderModule,
    NgbModule,
    MobileAppLinkModule
  ]
})
export class RechargeBillGasModule { }
