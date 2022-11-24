import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Company } from "src/app/shared/models/company.model";
import { RepositoryBase } from "src/app/shared/repository/base.repository";

@Injectable({
  providedIn: "root"
})
export class CompanyRepository extends RepositoryBase<Company> {

  constructor(protected override http: HttpClient) {
    super(http, "companies");
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
}
