import { NavbarModule } from './../booking/navbar/navbar.module';
import { HeaderModule } from './../user-interface/header/header.module';
import { FooterModule } from './../user-interface/footer/footer.module';
import { RouterModule } from '@angular/router';
import { ModalDialogModule } from './../user-interface/modal-dialog/modal-dialog.module';
import { ExcerptPipe } from './../excerpt.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserInterfaceRoutingModule } from './../user-interface/user-interface-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ECommerceRoutingModule } from './e-commerce-routing.module';
import { HomeComponent } from './home/home.component';
import { ECommerceHeaderComponent } from './e-commerce-header/e-commerce-header.component';
import { ECommerceFooterComponent } from './e-commerce-footer/e-commerce-footer.component';
import { ECommerceModelDilogComponent } from './e-commerce-model-dilog/e-commerce-model-dilog.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductCheckoutComponent } from './product-checkout/product-checkout.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LogoutComponent } from './logout/logout.component';
import { ShareModuleModule } from '../share-module/share-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { ToastrModule } from 'ngx-toastr';
import { NgxDefaultImageModule } from 'ngx-default-image';
import { ProfileMenuModule } from '../user-interface/profile-menu/profile-menu.module';
import { ModalDialogComponent } from '../user-interface/modal-dialog/modal-dialog.component';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    HomeComponent,
    ECommerceHeaderComponent,
    ECommerceFooterComponent,
    ECommerceModelDilogComponent,
    ProductDetailsComponent,
    ProductListComponent,
    ProductCartComponent,
    ProductCheckoutComponent,
    ThankyouComponent,
    WishlistComponent,
    MyOrdersComponent,
    OrderDetailsComponent,
    LogoutComponent,
    ExcerptPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ECommerceRoutingModule,
    NgbModule,
    NgSelectModule,
    NgxPaginationModule,
    IvyCarouselModule,
    NgxDefaultImageModule,
    RouterModule,
    NavbarModule,
    // UserInterfaceRoutingModule,
    ModalDialogModule,
    ToastrModule.forRoot(),
    ProfileMenuModule,
    FooterModule,
    HeaderModule,
    ModalDialogModule,
    MatExpansionModule
  ],
  exports:[ECommerceHeaderComponent,
    ECommerceFooterComponent,],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },ModalDialogComponent,ProductListComponent,ProductDetailsComponent,ProductCartComponent],
  // providers: [Location,{ provide: LocationStrategy, useClass: PathLocationStrategy },ModalDialogComponent,ProductListComponent,ProductDetailsComponent,ProductCartComponent],
})
export class ECommerceModule {}
