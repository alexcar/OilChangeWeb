import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm!: UntypedFormGroup;
    loading!: boolean;

    constructor(private router: Router,
        private titleService: Title,
        private notificationService: NotificationService,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Troca Óleo - Login');
        this.authenticationService.logout();
        this.createForm();
    }

    private createForm() {
        this.loginForm = new UntypedFormGroup({
            // email: new UntypedFormControl('', [Validators.required, Validators.email]),
            login: new UntypedFormControl('', Validators.required),
            password: new UntypedFormControl('', Validators.required)
        });
    }

    // login() {
    //     const email = this.loginForm.get('email')?.value;
    //     const login = this.loginForm.get('login')?.value;
    //     const password = this.loginForm.get('password')?.value;
    //     const rememberMe = this.loginForm.get('rememberMe')?.value;

    //     // console.log("login: ", login);
    //     // console.log("password: ", password);

    //     this.loading = true;
    //     this.authenticationService
    //         .login(login.toLowerCase(), password)
    //         .subscribe(
    //             data => {
    //                 if (rememberMe) {
    //                     localStorage.setItem('savedUserEmail', email);
    //                 } else {
    //                     localStorage.removeItem('savedUserEmail');
    //                 }
    //                 this.router.navigate(['/']);
    //             },
    //             error => {
    //                 this.notificationService.openSnackBar(error.error);
    //                 this.loading = false;
    //             }
    //         );
    // }

    login(): void {
        const login = this.loginForm.get('login')?.value;
        const password = this.loginForm.get('password')?.value;

        this.loading = true;
        this.authenticationService
            .login(login.toLowerCase(), password)
            .subscribe({
              next: (result) => {
                localStorage.setItem("currentUser", JSON.stringify({
                  id: result.id,
                  firstName: result.firstName,
                  lastName: result.lastName,
                  email: result.email,
                  accessToken: result.accessToken,
                  refreshToken: result.refreshToken,
                  isAdmin: result.isAdmin
                }));

                if (result.isAdmin) {
                  this.router.navigate(['/company']);
                } else {
                  this.router.navigate(['/customers']);
                }
              },
              error: (e) => {
                // this.notificationService.openSnackBar(e.message);
                this.notificationService.openSnackBar("Usuário não encontrado.");
                this.loading = false;
              }
            });
    }

    resetPassword() {
        this.router.navigate(['/auth/password-reset-request']);
    }
}
