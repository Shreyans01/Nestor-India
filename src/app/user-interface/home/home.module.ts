import { MobileAppLinkModule } from 'src/app/user-interface/mobile-app-link/mobile-app-link.module';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubHeaderModule } from './../sub-header/sub-header.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    SubHeaderModule,
    NgbModule,
    IvyCarouselModule,
    MobileAppLinkModule
  ],
})
export class HomeModule { }
