import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { PriceQuoteListComponent } from './price-quote-list/price-quote-list.component';
import { PtBrMatPaginatorIntl } from './../../shared/paginator/portuguese-paginator-intl';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThankYouCustomerComponent } from './thank-you-customer/thank-you-customer.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { SendPriceQuoteComponent } from './send-price-quote/send-price-quote.component';
import { TyPriceQuoteComponent } from './ty-price-quote/ty-price-quote.component';
import { CustomerAccountComponent } from './customer-account/customer-account.component';
import { PriceQuoteDetailComponent } from './price-quote-detail/price-quote-detail.component';

@NgModule({
    imports: [
        CommonModule,
        CustomersRoutingModule,
        SharedModule
    ],
    declarations: [
        CustomerListComponent,
        ThankYouCustomerComponent,
        PriceQuoteListComponent,
        VehicleListComponent,
        VehicleComponent,
        DeleteAccountComponent,
        SendPriceQuoteComponent,
        TyPriceQuoteComponent,
        CustomerAccountComponent,
        PriceQuoteDetailComponent
    ],
    providers: [
      { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl }
    ]
})
export class CustomersModule { }
