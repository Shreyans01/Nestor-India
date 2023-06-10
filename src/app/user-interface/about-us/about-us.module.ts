import { AboutUsComponent } from './about-us.component';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from '../my-profile/my-profile.component';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { RouterModule } from '@angular/router';
import { ModalDialogModule } from '../modal-dialog/modal-dialog.module';
import { ECommerceModule } from 'src/app/e-commerce/e-commerce.module';

@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
    FooterModule,
    RouterModule,
    ModalDialogModule,
    AboutUsRoutingModule,
    ECommerceModule
  ]
})
export class AboutUsModule { }
