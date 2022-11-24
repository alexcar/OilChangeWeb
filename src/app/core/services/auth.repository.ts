import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserForAuthenticationDto } from "src/app/shared/models/user-for-authentication-dto";
import { User } from "src/app/shared/models/user.model";
import { RepositoryBase } from "src/app/shared/repository/base.repository";
import { AuthenticatedUserDto } from 'src/app/shared/models/authenticated-user-dto';


@Injectable({
  providedIn: "root"
})
export class AuthenticationRepository extends RepositoryBase<User> {

  constructor(protected override http: HttpClient) {
    super(http, "Authentication");
  }

  login(entity: UserForAuthenticationDto): Observable<AuthenticatedUserDto> {
    const url = this.createCompleteRoute(`${this.route}/login`);

    return this.sendRequest("POST", url, entity);
  }
}
