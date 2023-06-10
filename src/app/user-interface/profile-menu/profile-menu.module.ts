import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DpDatePickerModule } from 'ng2-date-picker';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DataTablesModule } from 'angular-datatables';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileMenuComponent } from './profile-menu.component';
import { ProfileMenuRoutingModule } from './profile-menu-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ProfileMenuComponent],
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
    ProfileMenuRoutingModule
  ],
  exports: [ProfileMenuComponent] 
})
export class ProfileMenuModule { }
