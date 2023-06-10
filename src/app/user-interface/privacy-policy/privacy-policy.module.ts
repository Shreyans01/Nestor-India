import { PrivacyPolicyComponent } from './privacy-policy.component';
import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { ModalDialogModule } from '../modal-dialog/modal-dialog.module';
import { ECommerceModule } from 'src/app/e-commerce/e-commerce.module';

@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
    FooterModule,
    ModalDialogModule,
    PrivacyPolicyRoutingModule,
    ECommerceModule,
  ]
})
export class PrivacyPolicyModule { }
