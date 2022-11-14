import { RouterModule, Routes } from '@angular/router';

import { CustomerRegistrationComponent } from 'src/app/shared/features/customer-registration/customer-registration.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { NgModule } from '@angular/core';
import { PriceQuoteDetailComponent } from '../../shared/features/price-quote-detail/price-quote-detail.component';
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
      { path: '', component: PriceQuoteListComponent },
      { path: "vehicleList", component: VehicleListComponent },
      { path: "vehicle", component: VehicleComponent },
      { path: "priceQuoteDetail", component: PriceQuoteDetailComponent },
      { path: "deleteAccount", component: DeleteAccountComponent },
      { path: "sendPriceQuote", component: SendPriceQuoteComponent },
      { path: "thankYouPriceQuote", component: TyPriceQuoteComponent },
      { path: "account", component: CustomerRegistrationComponent }
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
