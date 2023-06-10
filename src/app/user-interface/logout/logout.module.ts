import { LogoutComponent } from './logout.component';
import { LogoutRoutingModule } from './logout-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LogoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LogoutRoutingModule
  ]
})
export class LogoutModule { }
