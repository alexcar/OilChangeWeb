import * as moment from 'moment';

import { CanActivate, Router } from '@angular/router';

import { AuthenticationService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private notificationService: NotificationService,
        private authService: AuthenticationService) { }

    canActivate() {
        const user = this.authService.getCurrentUser();

        // if (user && user.expiration) {
        //     if (moment() < moment(user.expiration)) {
        //         return true;
        //     } else {
        //         this.notificationService.openSnackBar('Your session has expired');
        //         this.router.navigate(['auth/login']);
        //         return false;
        //     }
        // }

      if (user && user.accessToken) {
        return true;
      } else {
        this.router.navigate(['auth/login']);
        return false;
      }
    }
}
