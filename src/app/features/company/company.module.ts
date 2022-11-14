import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { PtBrMatPaginatorIntl } from 'src/app/shared/paginator/portuguese-paginator-intl';
import { PurchaseOrderListComponent } from './purchase-order-list/purchase-order-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

@NgModule({
  declarations: [
    PurchaseOrderListComponent,
    PurchaseOrderComponent,
    CustomerListComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl }
  ]
})
export class CompanyModule { }
