import { HeaderComponent } from './header.component';
import { HeaderRoutingModule } from './header-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DpDatePickerModule } from 'ng2-date-picker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbModule,
    IvyCarouselModule,
    DataTablesModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    DpDatePickerModule,
    NgxSpinnerModule,
    NgxBootstrapIconsModule.pick(allIcons),
    NgHttpLoaderModule,
    HeaderRoutingModule,
  ],
  exports:[HeaderComponent]
})
export class HeaderModule { }
