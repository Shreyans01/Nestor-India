import { FooterModule } from './../footer/footer.module';
import { ProfileMenuModule } from './../profile-menu/profile-menu.module';
import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '../header/header.module';
import { ECommerceModule } from 'src/app/e-commerce/e-commerce.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChangePasswordRoutingModule,
    ProfileMenuModule,
    HeaderModule,
    FooterModule,
    ECommerceModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
  ]
})
export class ChangePasswordModule { }
