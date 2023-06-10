import { MobileAppLinkModule } from './../mobile-app-link/mobile-app-link.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubHeaderModule } from './../sub-header/sub-header.module';
import { LoanRepaymentComponent } from './loan-repayment.component';
import { LoanRepaymentRoutingModule } from './loan-repayment-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoanRepaymentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoanRepaymentRoutingModule,
    SubHeaderModule,
    NgbModule,
    MobileAppLinkModule
  ]
})
export class LoanRepaymentModule { }
