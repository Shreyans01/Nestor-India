import { ContactComponent } from './../user-interface/contact/contact.component';
import { PassbookComponent } from './../user-interface/passbook/passbook.component';
import { ChangePasswordComponent } from './../user-interface/change-password/change-password.component';
import { AccountStatementComponent } from './../user-interface/account-statement/account-statement.component';
import { AuthGuard } from './../guard/auth.guard';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductCheckoutComponent } from './product-checkout/product-checkout.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileMenuComponent } from '../user-interface/profile-menu/profile-menu.component';
import { MyProfileComponent } from '../user-interface/my-profile/my-profile.component';
import { AboutUsComponent } from '../user-interface/about-us/about-us.component';
import { PrivacyPolicyComponent } from '../user-interface/privacy-policy/privacy-policy.component';
import { DisclaimerComponent } from '../user-interface/disclaimer/disclaimer.component';
import { TermsConditionsComponent } from '../user-interface/terms-conditions/terms-conditions.component';
import { ReturnAndCancellationComponent } from '../user-interface/return-and-cancellation/return-and-cancellation.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';
import { ShippingPolicyComponent } from '../user-interface/shipping-policy/shipping-policy.component';
import { FavouriteComponent } from '../user-interface/favourite/favourite.component';
import { CardsComponent } from '../user-interface/cards/cards.component';
import { MyOrderComponent } from '../user-interface/my-order/my-order.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'disclaimer', component: DisclaimerComponent },
  { path: 'terms', component: TermsConditionsComponent },
  { path: 'return-and-cancellation-policy', component: ReturnAndCancellationComponent },
  { path: 'shipping-policy', component: ShippingPolicyComponent },
  { path: 'productDetails', component: ProductDetailsComponent },
  { path: 'productList', component: ProductListComponent },
  {
    path: 'productCart',
    component: ProductCartComponent,
  },
  {
    path: 'productCheckout',
    component: ProductCheckoutComponent,
  },

  { path: 'cashfree/callback', component: PaymentStatusComponent },

  { path: 'thankyou', component: ThankyouComponent },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: MyProfileComponent, canActivate: [AuthGuard] },
  { path: 'accountStatement', component: AccountStatementComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'favourite', component: FavouriteComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'passbook', component: PassbookComponent },
  { path: 'contact-us', component: ContactComponent },
  { path: 'orderHistory', component: OrderDetailsComponent },
  { path: 'myOrders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'my-order', component: MyOrderComponent, canActivate: [AuthGuard] },
  {
    path: 'orderDetails',
    component: OrderDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'logout', component: LogoutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
  providers:[HomeComponent]
})
export class ECommerceRoutingModule { }
