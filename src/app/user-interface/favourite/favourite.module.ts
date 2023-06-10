import { FooterModule } from './../footer/footer.module';
import { NavbarModule } from './../../booking/navbar/navbar.module';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DpDatePickerModule } from 'ng2-date-picker';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './../header/header.module';
import { ProfileMenuModule } from './../profile-menu/profile-menu.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FavouriteComponent } from './favourite.component';
import { FavouriteRoutingModule } from './favourite-routing.module';
import { ECommerceModule } from 'src/app/e-commerce/e-commerce.module';

@NgModule({
  declarations: [FavouriteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    IvyCarouselModule,
    Ng2SearchPipeModule,
    RouterModule,
    DpDatePickerModule,
    NgxSpinnerModule,
    NgxBootstrapIconsModule.pick(allIcons),
    NgHttpLoaderModule,
    ProfileMenuModule,
    FooterModule,
    HeaderModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    FavouriteRoutingModule,
    ECommerceModule
  ],
  exports:[FavouriteComponent]
})
export class FavouriteModule { }
