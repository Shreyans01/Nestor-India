import { FooterModule } from './footer/footer.module';
import { MobileAppLinkModule } from 'src/app/user-interface/mobile-app-link/mobile-app-link.module';
import { SubHeaderModule } from './sub-header/sub-header.module';
import { HeaderModule } from './header/header.module';
import { ModalDialogModule } from './modal-dialog/modal-dialog.module';
import { HttpClientModule } from '@angular/common/http';
import { ShareModuleModule } from './../share-module/share-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UserInterfaceRoutingModule } from './user-interface-routing.module';
import { SubHeaderComponent } from './sub-header/sub-header.component';
import { HomeComponent } from './home/home.component';
import { RechargeBillDthComponent } from './recharge-bill-dth/recharge-bill-dth.component';
import { RechargeBillDatacardComponent } from './recharge-bill-datacard/recharge-bill-datacard.component';
import { RechargeBillBroadbandComponent } from './recharge-bill-broadband/recharge-bill-broadband.component';
import { RechargeBillLandlineComponent } from './recharge-bill-landline/recharge-bill-landline.component';
import { RechargeBillCabletvComponent } from './recharge-bill-cabletv/recharge-bill-cabletv.component';
import { RechargeBillElectricityComponent } from './recharge-bill-electricity/recharge-bill-electricity.component';
import { RechargeBillMetroComponent } from './recharge-bill-metro/recharge-bill-metro.component';
import { RechargeBillGasComponent } from './recharge-bill-gas/recharge-bill-gas.component';
import { RechargeBillWaterComponent } from './recharge-bill-water/recharge-bill-water.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { ReturnAndCancellationComponent } from './return-and-cancellation/return-and-cancellation.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LogoutComponent } from './logout/logout.component';
import { FastagComponent } from './fastag/fastag.component';
import { HealthInsuranceComponent } from './health-insurance/health-insurance.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { LifeInsuranceComponent } from './life-insurance/life-insurance.component';
import { LpgGasComponent } from './lpg-gas/lpg-gas.component';
import { MunicipalTaxesComponent } from './municipal-taxes/municipal-taxes.component';
import { LoanRepaymentComponent } from './loan-repayment/loan-repayment.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { DataTablesModule } from 'angular-datatables';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { RechargePaymentSuccessComponent } from './recharge-payment-success/recharge-payment-success.component';
import { AccountStatementComponent } from './account-statement/account-statement.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { PassbookComponent } from './passbook/passbook.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { BusInvoiceComponent } from './bus-invoice/bus-invoice.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { UserInterfaceLayoutComponent } from './user-interface-layout/user-interface-layout.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { CardsComponent } from './cards/cards.component';
import { MyOrderComponent } from './my-order/my-order.component';


@NgModule({
  declarations: [
    // SubHeaderComponent,
    // HomeComponent,
    // RechargeBillDthComponent,
    // RechargeBillDatacardComponent,
    // RechargeBillBroadbandComponent,
    // RechargeBillLandlineComponent,
    // RechargeBillCabletvComponent,
    // RechargeBillElectricityComponent,
    // RechargeBillMetroComponent,
    // RechargeBillGasComponent,
    // RechargeBillWaterComponent,
    // AboutUsComponent,
    // ContactComponent,
    // PrivacyPolicyComponent,
    // DisclaimerComponent,
    // TermsConditionsComponent,
    // ReturnAndCancellationComponent,
    // ChangePasswordComponent,
    // // ProfileMenuComponent,
    // LogoutComponent,
    // FastagComponent,
    // HealthInsuranceComponent,
    // InsuranceComponent,
    // LifeInsuranceComponent,
    // LpgGasComponent,
    // MunicipalTaxesComponent,
    // LoanRepaymentComponent,
    // OrderSummaryComponent,
    // RechargePaymentSuccessComponent,
    // // AccountStatementComponent,
    // // PassbookComponent,
    // ThankyouComponent,
    // BusInvoiceComponent,
    // OrderHistoryComponent,
    UserInterfaceLayoutComponent
  ],
  imports: [
    CommonModule,
    UserInterfaceRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    IvyCarouselModule,
    DataTablesModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    RouterModule,
    DpDatePickerModule,
    NgxSpinnerModule,
    NgxBootstrapIconsModule.pick(allIcons),
    NgHttpLoaderModule,
    ModalDialogModule,
    HeaderModule,
    SubHeaderModule,
    MobileAppLinkModule,
    FooterModule
  ],
  exports: [RouterModule],
  // providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class UserInterfaceModule {}
