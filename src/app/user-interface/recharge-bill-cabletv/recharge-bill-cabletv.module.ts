import { MobileAppLinkModule } from './../mobile-app-link/mobile-app-link.module';
import { SubHeaderModule } from './../sub-header/sub-header.module';
import { RechargeBillCabletvComponent } from './recharge-bill-cabletv.component';
import { RechargeBillCabletvRoutingModule } from './recharge-bill-cabletv-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [RechargeBillCabletvComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RechargeBillCabletvRoutingModule,
    SubHeaderModule,
    NgbModule,
    MobileAppLinkModule
  ]
})
export class RechargeBillCabletvModule { }
