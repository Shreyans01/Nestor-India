import { SubHeaderModule } from './../sub-header/sub-header.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MobileAppLinkModule } from './../mobile-app-link/mobile-app-link.module';
import { MunicipalTaxesComponent } from './municipal-taxes.component';
import { MunicipalTaxesRoutingModule } from './municipal-taxes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MunicipalTaxesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MunicipalTaxesRoutingModule,
    MobileAppLinkModule,
    IvyCarouselModule,
    NgbModule,
    SubHeaderModule
  ]
})
export class MunicipalTaxesModule { }
