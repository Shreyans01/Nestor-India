import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RechargeBillDatacardComponent } from './recharge-bill-datacard.component';
import { RechargeBillDatacardRoutingModule } from './recharge-bill-datacard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubHeaderModule } from '../sub-header/sub-header.module';

@NgModule({
  declarations: [RechargeBillDatacardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RechargeBillDatacardRoutingModule,
    SubHeaderModule,
    NgbModule
  ]
})
export class RechargeBillDatacardModule { }
