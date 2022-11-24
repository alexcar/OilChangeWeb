import { HttpErrorResponse, HttpInterceptor } from '@angular/common/http';

import { AuthenticationService } from '../services/auth.service';
import { HttpEvent } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthenticationService,
        private router: Router,
        private dialog: MatDialog) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const user = this.authService.getCurrentUser();

        if (user && user.accessToken) {

            const cloned = req.clone({
                headers: req.headers.set('Authorization',
                    'Bearer ' + user.accessToken)
            });

            return next.handle(cloned).pipe(tap(() => { }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.dialog.closeAll();
                        this.router.navigate(['/auth/login']);
                    }
                }
            }));

        } else {
            return next.handle(req);
        }
    }
}
