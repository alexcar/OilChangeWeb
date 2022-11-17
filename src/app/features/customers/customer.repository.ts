import { Customer } from './../../shared/models/customer.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RepositoryBase } from 'src/app/shared/repository/base.repository';


@Injectable({
  providedIn: "root"
})
export class CustomerRepository extends RepositoryBase<Customer> {

  constructor(protected override http: HttpClient) {
    super(http, "customer");
  }
}
