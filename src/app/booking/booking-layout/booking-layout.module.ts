import { BookingRoutingModule } from './../booking-routing.module';
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
import { BookingLayoutComponent } from './booking-layout.component';
import { BookingLayoutRoutingModule } from './booking-layout-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '../../user-interface/header/header.module';
import { FooterModule } from '../../user-interface/footer/footer.module';
import { ModalDialogModule } from '../../user-interface/modal-dialog/modal-dialog.module';
import { NavbarModule } from '../navbar/navbar.module';

@NgModule({
  declarations: [BookingLayoutComponent],
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
    BookingLayoutRoutingModule,
    NavbarModule,
    HeaderModule,
    FooterModule,
    ModalDialogModule
  ]
})
export class BookingLayoutModule { }
