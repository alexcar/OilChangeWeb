import { AuthenticatedUserDto } from './../../shared/models/authenticated-user-dto';
import { UserForAuthenticationDto } from './../../shared/models/user-for-authentication-dto';
import { AuthenticationRepository } from './auth.repository';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';

import { environment } from '../../../environments/environment';
import { of, EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
    private repository: AuthenticationRepository,
    @Inject('LOCALSTORAGE') private localStorage: Storage) {
  }

  // login(email: string, password: string) {
  //   return of(true)
  //     .pipe(delay(1000),
  //       map((/*response*/) => {
  //         // set token property
  //         // const decodedToken = jwt_decode(response['token']);

  //         // store email and jwt token in local storage to keep user logged in between page refreshes
  //         this.localStorage.setItem('currentUser', JSON.stringify({
  //           token: 'aisdnaksjdn,axmnczm',
  //           isAdmin: true,
  //           email: 'john.doe@gmail.com',
  //           id: '12312323232',
  //           alias: 'john.doe@gmail.com'.split('@')[0],
  //           expiration: moment().add(1, 'days').toDate(),
  //           fullName: 'John Doe'
  //         }));

  //         return true;
  //       }));
  // }

  // login2(login: string, password: string) {
  //   return of(true)
  //     .pipe(delay(1000),
  //       map(() => {
  //         // realizar login e armazenar no localStorage

  //         const userForAuthenticationDto: UserForAuthenticationDto = {
  //           userName: login,
  //           password: password
  //         };

  //         let isAdmin = false;

  //         this.repository.login(userForAuthenticationDto)
  //           .subscribe({
  //             next: (result) => {
  //               // recebe o token

  //               this.localStorage.setItem("currentUser", JSON.stringify({
  //                 id: result.id,
  //                 firstName: result.firstName,
  //                 lastName: result.lastName,
  //                 email: result.email,
  //                 accessToken: result.accessToken,
  //                 refreshToken: result.refreshToken,
  //                 isAdmin: result.isAdmin
  //               }));

  //               isAdmin = result.isAdmin;
  //             },
  //             error: (e) => {
  //               // TODO: Gravar log de erro.
  //               return false;
  //             }
  //           });

  //         return isAdmin;
  //       }));
  // }

  login(login: string, password: string): Observable<AuthenticatedUserDto> {
    const userForAuthenticationDto: UserForAuthenticationDto = {
      userName: login,
      password: password
    };

    return this.repository.login(userForAuthenticationDto);
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.localStorage.removeItem('currentUser');
  }

  // getCurrentUser(): any {
  //   // TODO: Enable after implementation
  //   // return JSON.parse(this.localStorage.getItem('currentUser'));
  //   return {
  //     token: 'aisdnaksjdn,axmnczm',
  //     isAdmin: false,
  //     email: 'john.doe@gmail.com',
  //     id: '12312323232',
  //     alias: 'john.doe@gmail.com'.split('@')[0],
  //     expiration: moment().add(1, 'days').toDate(),
  //     fullName: 'José da Silva'
  //   };
  // }

  getCurrentUser(): any {
    return JSON.parse(this.localStorage.getItem('currentUser') || '{}');
  }

  passwordResetRequest(email: string) {
    return of(true).pipe(delay(1000));
  }

  changePassword(email: string, currentPwd: string, newPwd: string) {
    return of(true).pipe(delay(1000));
  }

  passwordReset(email: string, token: string, password: string, confirmPassword: string): any {
    return of(true).pipe(delay(1000));
  }

  // private getMyHeaders2(): HttpHeaders {
  //   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWxleGNhciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluaXN0cmF0b3IiLCJleHAiOjE2NjkwMjA3MzQsImlzcyI6IlRyb2NhT2xlb0FQSSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcwOTgifQ.UGqfKHvYcZn3zpdnuYLWvN_cTluCOa9DcBQ0Mco2PKk";

  //   let myHeaders = new HttpHeaders()
  //   .set('Authorization', `Bearer ${token}`)
  //   .set('Access-key', 'alexcar');

  //   // myHeaders = myHeaders.set("Access-Key", "<alexcar>");
  //   // myHeaders = myHeaders.set("Authorization", `Bearer<${token}>`);
  //   // myHeaders.append("Authorization", token);

  //   return myHeaders;
  // }
}
