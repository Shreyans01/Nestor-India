import { ModalDialogModule } from './../modal-dialog/modal-dialog.module';
import { FooterModule } from './../footer/footer.module';
import { RouterModule } from '@angular/router';
import { HeaderModule } from './../header/header.module';
import { UserInterfaceLayoutComponent } from './user-interface-layout.component';
import { UserInterfaceLayoutRoutingModule } from './user-interface-layout-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [UserInterfaceLayoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
    RouterModule,
    FooterModule,
    UserInterfaceLayoutRoutingModule,
    ModalDialogModule
  ]
})
export class UserInterfaceLayoutModule { }
