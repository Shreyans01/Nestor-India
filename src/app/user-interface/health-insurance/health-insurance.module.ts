import { MobileAppLinkModule } from './../mobile-app-link/mobile-app-link.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HealthInsuranceComponent } from './health-insurance.component';
import { HealthInsuranceRoutingModule } from './health-insurance-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubHeaderModule } from '../sub-header/sub-header.module';

@NgModule({
  declarations: [HealthInsuranceComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HealthInsuranceRoutingModule,
    SubHeaderModule,
    NgbModule,
    MobileAppLinkModule
  ]
})
export class HealthInsuranceModule { }
