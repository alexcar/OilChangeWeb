import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { NgModule } from '@angular/core';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { PurchaseOrderListComponent } from './purchase-order-list/purchase-order-list.component';

const routes: Routes = [
  { path: '', component: LayoutComponent,
    children: [
      { path: '', component: PurchaseOrderListComponent },
      { path: "purchaseOrderDetail", component: PurchaseOrderComponent }
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
