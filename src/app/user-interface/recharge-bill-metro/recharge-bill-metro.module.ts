import { MobileAppLinkModule } from './../mobile-app-link/mobile-app-link.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubHeaderModule } from './../sub-header/sub-header.module';
import { RechargeBillMetroComponent } from './recharge-bill-metro.component';
import { RechargeBillMetroRoutingModule } from './recharge-bill-metro-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RechargeBillMetroComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RechargeBillMetroRoutingModule,
    SubHeaderModule,
    NgbModule
  ]
})
export class RechargeBillMetroModule { }
