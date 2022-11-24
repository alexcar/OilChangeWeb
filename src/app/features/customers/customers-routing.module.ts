import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CustomerAccountComponent } from './customer-account/customer-account.component';
import { CustomerRegistrationComponent } from 'src/app/shared/features/customer-registration/customer-registration.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { NgModule } from '@angular/core';
import { PriceQuoteDetailComponent } from './price-quote-detail/price-quote-detail.component';
import { PriceQuoteListComponent } from './price-quote-list/price-quote-list.component';
import { SendPriceQuoteComponent } from './send-price-quote/send-price-quote.component';
import { ThankYouCustomerComponent } from './thank-you-customer/thank-you-customer.component';
import { TyPriceQuoteComponent } from './ty-price-quote/ty-price-quote.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: PriceQuoteListComponent, canActivate: [AuthGuard] },
      { path: "vehicleList", component: VehicleListComponent, canActivate: [AuthGuard] },
      { path: "vehicle", component: VehicleComponent, canActivate: [AuthGuard] },
      { path: "priceQuoteDetail", component: PriceQuoteDetailComponent, canActivate: [AuthGuard] },
      { path: "deleteAccount", component: DeleteAccountComponent, canActivate: [AuthGuard] },
      { path: "sendPriceQuote", component: SendPriceQuoteComponent, canActivate: [AuthGuard] },
      { path: "thankYouPriceQuote", component: TyPriceQuoteComponent, canActivate: [AuthGuard] },
      { path: "account", component: CustomerAccountComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: "registration", component: CustomerRegistrationComponent },
  { path: "thankyou", component: ThankYouCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
