import { MobileAppLinkModule } from './../mobile-app-link/mobile-app-link.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubHeaderModule } from './../sub-header/sub-header.module';
import { LifeInsuranceRoutingModule } from './life-insurance-routing.module';
import { LifeInsuranceComponent } from './life-insurance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LifeInsuranceComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LifeInsuranceRoutingModule,
    SubHeaderModule,
    NgbModule,
    MobileAppLinkModule,
    
  ]
})
export class LifeInsuranceModule { }
