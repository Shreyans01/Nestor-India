import { MobileAppLinkModule } from './../mobile-app-link/mobile-app-link.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubHeaderModule } from './../sub-header/sub-header.module';
import { LpgGasRoutingModule } from './lpg-gas-routing.module';
import { LpgGasComponent } from './lpg-gas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LpgGasComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LpgGasRoutingModule,
    SubHeaderModule,
    NgbModule,
    MobileAppLinkModule
  ]
})
export class LpgGasModule { }
