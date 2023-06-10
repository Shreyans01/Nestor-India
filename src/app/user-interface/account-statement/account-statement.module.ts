import { FooterModule } from './../footer/footer.module';
import { HeaderModule } from './../header/header.module';
import { ProfileMenuModule } from './../profile-menu/profile-menu.module';
import { AccountStatementComponent } from './account-statement.component';
import { AccountStatementRoutingModule } from './account-statement-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AccountStatementComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccountStatementRoutingModule,
    HeaderModule,
    FooterModule,
    ProfileMenuModule
  ]
})
export class AccountStatementModule { }
