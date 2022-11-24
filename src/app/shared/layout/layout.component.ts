import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { SpinnerService } from '../../core/services/spinner.service';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {

    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    showSpinner: boolean = false;
    userName: string = "";
    isAdmin: boolean = false;

    private autoLogoutSubscription: Subscription = new Subscription;

    constructor(private changeDetectorRef: ChangeDetectorRef,
      private router: Router,
      private media: MediaMatcher,
      public spinnerService: SpinnerService,
      private authService: AuthenticationService,
      private authGuard: AuthGuard) {

        this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        // tslint:disable-next-line: deprecation
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {
        const user = this.authService.getCurrentUser();

        this.isAdmin = user.isAdmin;
        this.userName = user.firstName;

        // Auto log-out subscription
        const timer$ = timer(2000, 5000);
        this.autoLogoutSubscription = timer$.subscribe(() => {
            this.authGuard.canActivate();
        });
    }

    logout(): void {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
    }

    ngOnDestroy(): void {
        // tslint:disable-next-line: deprecation
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.autoLogoutSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }
}
