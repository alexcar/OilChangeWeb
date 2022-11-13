import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ContentPlaceholderAnimationComponent } from './content-placeholder-animation/content-placeholder-animation.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { CustomerRegistrationComponent } from './features/customer-registration/customer-registration.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutComponent } from './layout/layout.component';
import { LimitToPipe } from './pipes/limit-to.pipe';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { NgModule } from '@angular/core';
import { PriceQuoteDetailComponent } from './features/price-quote-detail/price-quote-detail.component';
import { PtBrMatPaginatorIntl } from '../shared/paginator/portuguese-paginator-intl';
import { RouterModule } from '@angular/router';
import { YesNoPipe } from './pipes/yes-no.pipe';

@NgModule({
    imports: [
        RouterModule,
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
    ],
    declarations: [
        ConfirmDialogComponent,
        ContentPlaceholderAnimationComponent,
        LimitToPipe,
        LocalDatePipe,
        YesNoPipe,
        LayoutComponent,
        PriceQuoteDetailComponent,
        CustomerRegistrationComponent
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        CustomMaterialModule,
        LimitToPipe,
        ConfirmDialogComponent,
        ContentPlaceholderAnimationComponent,
        LocalDatePipe,
        YesNoPipe
    ],
    providers: [
      PtBrMatPaginatorIntl
    ]
})
export class SharedModule { }
