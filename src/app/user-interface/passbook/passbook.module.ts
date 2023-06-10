import { FooterModule } from './../footer/footer.module';
import { HeaderModule } from './../header/header.module';
import { ProfileMenuModule } from './../profile-menu/profile-menu.module';
import { AboutUsRoutingModule } from './../about-us/about-us-routing.module';
import { PassbookComponent } from './passbook.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PassbookComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AboutUsRoutingModule,
    ProfileMenuModule,
    HeaderModule,
    FooterModule
  ]
})
export class PassbookModule { }
