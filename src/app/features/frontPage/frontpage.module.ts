import { CommonModule } from '@angular/common';
import { FrontPageHomeComponent } from './frontPage-home/frontPage-home.component';
import { FrontPageRoutingModule } from './frontpage-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [FrontPageHomeComponent],
    imports: [
        CommonModule,
        FrontPageRoutingModule,
        SharedModule
    ]
})
export class FrontPageModule { }
