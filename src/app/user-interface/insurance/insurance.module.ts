import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubHeaderModule } from './../sub-header/sub-header.module';
import { InsuranceComponent } from './insurance.component';
import { InsuranceRoutingModule } from './insurance-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [InsuranceComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InsuranceRoutingModule,
    SubHeaderModule,
    NgbModule
  ]
})
export class InsuranceModule { }
