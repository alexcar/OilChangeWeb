import { CustomerRegistration } from './../../shared/models/customer-registration.model';
import { Customer } from './../../shared/models/customer.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RepositoryBase } from 'src/app/shared/repository/base.repository';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: "root"
})
export class CustomerRepository extends RepositoryBase<Customer> {

  constructor(protected override http: HttpClient) {
    super(http, "customers");
  }

  createCustomerRegistration(entity: CustomerRegistration): Observable<CustomerRegistration> {
    const url = this.createCompleteRoute(`${this.route}/registration`);

    return this.sendRequest("POST", url, entity)
  }

}
