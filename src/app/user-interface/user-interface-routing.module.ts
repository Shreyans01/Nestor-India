import { PassbookComponent } from './passbook/passbook.component';
import { RechargePaymentSuccessComponent } from './recharge-payment-success/recharge-payment-success.component';
import { LogoutComponent } from './logout/logout.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { RechargeBillMetroComponent } from './recharge-bill-metro/recharge-bill-metro.component';
import { RechargeBillWaterComponent } from './recharge-bill-water/recharge-bill-water.component';
import { RechargeBillLandlineComponent } from './recharge-bill-landline/recharge-bill-landline.component';
import { RechargeBillGasComponent } from './recharge-bill-gas/recharge-bill-gas.component';
import { RechargeBillDthComponent } from './recharge-bill-dth/recharge-bill-dth.component';
import { RechargeBillDatacardComponent } from './recharge-bill-datacard/recharge-bill-datacard.component';
import { RechargeBillCabletvComponent } from './recharge-bill-cabletv/recharge-bill-cabletv.component';
import { RechargeBillBroadbandComponent } from './recharge-bill-broadband/recharge-bill-broadband.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RechargeBillElectricityComponent } from './recharge-bill-electricity/recharge-bill-electricity.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ReturnAndCancellationComponent } from './return-and-cancellation/return-and-cancellation.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { AuthGuard } from './../guard/auth.guard';
import { FastagComponent } from './fastag/fastag.component';
import { HealthInsuranceComponent } from './health-insurance/health-insurance.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { LifeInsuranceComponent } from './life-insurance/life-insurance.component';
import { LpgGasComponent } from './lpg-gas/lpg-gas.component';
import { MunicipalTaxesComponent } from './municipal-taxes/municipal-taxes.component';
import { LoanRepaymentComponent } from './loan-repayment/loan-repayment.component';
import { HomeComponent } from './home/home.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { AccountStatementComponent } from './account-statement/account-statement.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { BusInvoiceComponent } from './bus-invoice/bus-invoice.component';
import { UserInterfaceLayoutComponent } from './user-interface-layout/user-interface-layout.component';

const routes: Routes = [
  {
    path: '',
    // loadChildren: () =>
    //       import('./user-interface-layout/user-interface-layout.module').then(
    //         (mod) => mod.UserInterfaceLayoutModule
    //       ),
    component:UserInterfaceLayoutComponent,
    children: [
      { path: '',
      loadChildren: () =>
      import('./home/home.module').then(
        (mod) => mod.HomeModule
      ),
       },
      {
        path: 'rechargeBillBroadband',
        loadChildren: () =>
          import('./recharge-bill-broadband/recharge-bill-broadband.module').then(
            (mod) => mod.RechargeBillBroadbandModule
          ),
      },
      { path: 'rechargeBillCabletv',
      loadChildren: () =>
      import('./recharge-bill-cabletv/recharge-bill-cabletv.module').then(
        (mod) => mod.RechargeBillCabletvModule
      ), 
      },
      {
        path: 'rechargeBillDatacard',
        loadChildren: () =>
      import('./recharge-bill-datacard/recharge-bill-datacard.module').then(
        (mod) => mod.RechargeBillDatacardModule
      ), 
      },
      { path: 'rechargeBillDth', 
      loadChildren: () =>
      import('./recharge-bill-dth/recharge-bill-dth.module').then(
        (mod) => mod.RechargeBillDthModule
      ),  
    },
      {
        path: 'rechargeBillElectricity',
        loadChildren: () =>
      import('./recharge-bill-electricity/recharge-bill-electricity.module').then(
        (mod) => mod.RechargeBillElectricityModule
      ), 
      },
      { path: 'rechargeBillGas',
      loadChildren: () =>
      import('./recharge-bill-gas/recharge-bill-gas.module').then(
        (mod) => mod.RechargeBillGasModule
      ), 
       },
      {
        path: 'rechargeBillLandline',
        loadChildren: () =>
      import('./recharge-bill-landline/recharge-bill-landline.module').then(
        (mod) => mod.RechargeBillLandlineModule
      ), 
      },
      { path: 'rechargeBillWater',
      loadChildren: () =>
      import('./recharge-bill-water/recharge-bill-water.module').then(
        (mod) => mod.RechargeBillWaterModule
      ),  
      },
      { path: 'rechargeBillMetro',
      loadChildren: () =>
      import('./recharge-bill-metro/recharge-bill-metro.module').then(
        (mod) => mod.RechargeBillMetroModule
      ),
       },
      { path: 'about-us',
      loadChildren: () =>
      import('./about-us/about-us.module').then(
        (mod) => mod.AboutUsModule
      ), 
      },
      { path: 'contact-us',
      loadChildren: () =>
      import('./contact/contact.module').then(
        (mod) => mod.ContactModule
      ), 
      },
      { path: 'disclaimer',
      loadChildren: () =>
      import('./disclaimer/disclaimer.module').then(
        (mod) => mod.DisclaimerModule
      ), 
      },
      { path: 'privacy',
      loadChildren: () =>
      import('./privacy-policy/privacy-policy.module').then(
        (mod) => mod.PrivacyPolicyModule
      ), 
      },
      {
        path: 'return-and-cancellation-policy',
        loadChildren: () =>
      import('./return-and-cancellation/return-and-cancellation.module').then(
        (mod) => mod.ReturnAndCancellationModule
      ),
      },
      {
        path: 'shipping-policy',
        loadChildren: () =>
      import('./shipping-policy/shipping-policy.module').then(
        (mod) => mod.ShippingPolicyModule
      ),
      },
      {
        path: 'orderHistory',
        loadChildren: () =>
          import('./order-history/order-history.module').then(
            (mod) => mod.OrderHistoryModule
          ),
      },
      { path: 'busInvoice',
      loadChildren: () =>
      import('./bus-invoice/bus-invoice.module').then(
        (mod) => mod.BusInvoiceModule
      ), 
      },
      { path: 'terms',
      loadChildren: () =>
      import('./terms-conditions/terms-conditions.module').then(
        (mod) => mod.TermsConditionsModule
      ), 
      },
      { path: 'fastag',
      loadChildren: () =>
      import('./fastag/fastag.module').then(
        (mod) => mod.FastagModule
      ), 
      },
      { path: 'healthInsurance',
      loadChildren: () =>
      import('./health-insurance/health-insurance.module').then(
        (mod) => mod.HealthInsuranceModule
      ), 
      },
      { path: 'insurance', 
      loadChildren: () =>
      import('./insurance/insurance.module').then(
        (mod) => mod.InsuranceModule
      ),  
    },
      { path: 'lifeInsurance',
      loadChildren: () =>
      import('./life-insurance/life-insurance.module').then(
        (mod) => mod.LifeInsuranceModule
      ),   
      },
      { path: 'lpgGas',
      loadChildren: () =>
      import('./lpg-gas/lpg-gas.module').then(
        (mod) => mod.LpgGasModule
      ),   
    },
      { path: 'municipalTaxes',
      loadChildren: () =>
      import('./municipal-taxes/municipal-taxes.module').then(
        (mod) => mod.MunicipalTaxesModule
      ),  
       },
      { path: 'loanRepayment',
      loadChildren: () =>
      import('./loan-repayment/loan-repayment.module').then(
        (mod) => mod.LoanRepaymentModule
      ),  
       },
      {
        path: 'profile',
        // component:MyProfileComponent,
        loadChildren: () =>
          import('./my-profile/my-profile.module').then(
            (mod) => mod.MyProfileModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'favourite',
        loadChildren: () =>
          import('./favourite/favourite.module').then(
            (mod) => mod.FavouriteModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'cards',
        loadChildren: () =>
          import('./cards/cards.module').then(
            (mod) => mod.CardsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'my-order',
        loadChildren: () =>
          import('./my-order/my-order.module').then(
            (mod) => mod.MyOrderModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'change-password',
        loadChildren: () =>
      import('./change-password/change-password.module').then(
        (mod) => mod.ChangePasswordModule
      ),  
        canActivate: [AuthGuard],
      },
      { path: 'orderSummary',
      loadChildren: () =>
      import('./order-summary/order-summary.module').then(
        (mod) => mod.OrderSummaryModule
      ),   
      },
      {
        path: 'rechargePaymentSuccess',
        loadChildren: () =>
      import('./recharge-payment-success/recharge-payment-success.module').then(
        (mod) => mod.RechargePaymentSuccessModule
      ),   
      },
      { path: 'accountStatement',
      loadChildren: () =>
      import('./account-statement/account-statement.module').then(
        (mod) => mod.AccountStatementModule
      ),
       },

      {
        path: 'passbook',
        loadChildren: () =>
          import('./passbook/passbook.module').then(
            (mod) => mod.PassbookModule
          ),
      },
      { path: 'thankyou',
      loadChildren: () =>
      import('./thankyou/thankyou.module').then(
        (mod) => mod.ThankyouModule
      ),
       },
      { path: 'logout',
      loadChildren: () =>
      import('./logout/logout.module').then(
        (mod) => mod.LogoutModule
      ),
       },
    ],
  },

  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserInterfaceRoutingModule {}
