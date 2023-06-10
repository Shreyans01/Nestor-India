import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { Ng5SliderModule } from 'ng5-slider';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { ShareModuleModule } from './../../share-module/share-module.module';
import { BookingRoutingModule } from './../booking-routing.module';
import { BusListComponent } from './bus-list.component';
import { BusListRoutingModule } from './bus-list-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BusListComponent],
  imports: [
    CommonModule,
    ShareModuleModule,
    IvyCarouselModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    Ng5SliderModule,
    AutocompleteLibModule,
    NgxSliderModule,
    MatSliderModule,
    HttpClientModule,
    RouterModule,
    BusListRoutingModule
  ]
})
export class BusListModule { }
