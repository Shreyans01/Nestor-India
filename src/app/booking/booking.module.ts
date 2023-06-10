import { ModalDialogModule } from './../user-interface/modal-dialog/modal-dialog.module';
import { FooterModule } from './../user-interface/footer/footer.module';
import { HeaderModule } from './../user-interface/header/header.module';
import { NavbarModule } from './navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { ShareModuleModule } from './../share-module/share-module.module';
import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BusbookingComponent } from './busbooking/busbooking.component';
import { BookingLayoutComponent } from './booking-layout/booking-layout.component';
import { BusListComponent } from './bus-list/bus-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookingBusConfirmDetailsComponent } from './booking-bus-confirm-details/booking-bus-confirm-details.component';
import { Ng5SliderModule } from 'ng5-slider';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatSliderModule } from '@angular/material/slider';
import { BusSeatBookingPaymentComponent } from './bus-seat-booking-payment/bus-seat-booking-payment.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

@NgModule({
  declarations: [
    // BusbookingComponent,
    // BookingLayoutComponent,
    // BusListComponent,
    // NavbarComponent,
    // BookingBusConfirmDetailsComponent,
    // BusSeatBookingPaymentComponent,
    // ThankyouComponent,
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
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
    NavbarModule,
    HeaderModule,
    FooterModule,
    ModalDialogModule
  ],
  // providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class BookingModule { }
