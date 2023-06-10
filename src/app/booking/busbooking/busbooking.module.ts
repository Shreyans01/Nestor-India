import { NavbarModule } from './../navbar/navbar.module';
import { ShareModuleModule } from './../../share-module/share-module.module';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng5SliderModule } from 'ng5-slider';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BusbookingComponent } from './busbooking.component';
import { BusbookingRoutingModule } from './busbooking-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileAppLinkModule } from 'src/app/user-interface/mobile-app-link/mobile-app-link.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from 'src/app/user-interface/header/header.module';

@NgModule({
  declarations: [BusbookingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IvyCarouselModule,
    NgbModule,
    Ng2SearchPipeModule,
    Ng5SliderModule,
    AutocompleteLibModule,
    NgxSliderModule,
    MatSliderModule,
    RouterModule,
    BusbookingRoutingModule,
    MobileAppLinkModule,
    HeaderModule,
    NavbarModule
  ]
})
export class BusbookingModule { }
