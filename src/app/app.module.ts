import { ExcerptPipe } from './excerpt.pipe';
import { BookingModule } from './booking/booking.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { ShareModuleModule } from './share-module/share-module.module';
import { UserInterfaceModule } from './user-interface/user-interface.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationStrategy, PathLocationStrategy, CommonModule, HashLocationStrategy } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Error404Component } from './error404/error404.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';
import { Ng5SliderModule } from 'ng5-slider';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { PaymentStatusComponent } from './e-commerce/payment-status/payment-status.component';



@NgModule({
    declarations: [AppComponent, Error404Component,PaymentStatusComponent],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    // BookingModule,
    ECommerceModule,
    // UserInterfaceModule,
    // NgSelectModule,
    // NgxPaginationModule,
    // FormsModule,
    // IvyCarouselModule,
    DataTablesModule,
    Ng5SliderModule,
    AutocompleteLibModule,
    NgxSliderModule,
    // ReactiveFormsModule,
    // NgxSpinnerModule,
    NgxBootstrapIconsModule.pick(allIcons),
    // ToastrModule,
    NgHttpLoaderModule,
    NoopAnimationsModule,
  ],
  exports: [],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
