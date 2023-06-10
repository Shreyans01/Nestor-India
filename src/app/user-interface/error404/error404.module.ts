import { ModalDialogModule } from './../modal-dialog/modal-dialog.module';
import { HeaderModule } from './../header/header.module';
import { Error404Component } from './error404.component';
import { Error404RoutingModule } from './error404-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from '../footer/footer.module';

@NgModule({
  declarations: [Error404Component],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Error404RoutingModule,
    HeaderModule,
    FooterModule,
    ModalDialogModule
  ]
})
export class Error404Module { }
