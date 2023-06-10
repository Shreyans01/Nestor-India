import { MobileAppLinkModule } from './../mobile-app-link/mobile-app-link.module';
import { SubHeaderModule } from './../sub-header/sub-header.module';
import { FastagComponent } from './fastag.component';
import { FastagRoutingModule } from './fastag-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [FastagComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FastagRoutingModule,
    SubHeaderModule,
    NgbModule,
    MobileAppLinkModule
  ]
})
export class FastagModule { }
