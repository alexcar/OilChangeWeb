import { RouterModule, Routes } from '@angular/router';

import { FrontPageHomeComponent } from './frontPage-home/frontPage-home.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: FrontPageHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontPageRoutingModule { }
