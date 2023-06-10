import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DpDatePickerModule } from 'ng2-date-picker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { SubHeaderModule } from './../sub-header/sub-header.module';
import { MobileAppLinkComponent } from './mobile-app-link.component';
import { MobileAppLinkRoutingModule } from './mobile-app-link-routing.module';

@NgModule({
  declarations: [MobileAppLinkComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    IvyCarouselModule,
    DataTablesModule,
    Ng2SearchPipeModule,
    RouterModule,
    DpDatePickerModule,
    NgxSpinnerModule,
    NgxBootstrapIconsModule.pick(allIcons),
    NgHttpLoaderModule,
    MobileAppLinkRoutingModule,
    SubHeaderModule,
  ],
  exports:[MobileAppLinkComponent]
})
export class MobileAppLinkModule { }
