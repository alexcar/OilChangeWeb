import { Injectable, OnDestroy } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';

import { Customer } from './../../shared/models/customer.model';
import { CustomerRegistration } from './../../shared/models/customer-registration.model';
import { CustomerRepository } from './customer.repository';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class CustomerService implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  // TODO: Gravar log de erro aqui no service

  constructor(private repository: CustomerRepository) {}

  // getAll(): Customer[] | undefined {
  //   let customers: Customer[] | undefined;

  //   this.repository.getAll()
  //     ?.pipe(takeUntil(this.destroy$))
  //     ?.subscribe({
  //       next: (result) => {
  //         customers = result;
  //       },
  //       error: (e) => {
  //         console.log(e);
  //       },
  //       complete: () => {
  //         console.info('complete');
  //       }
  //     });

  //   return customers;
  // }

  getAll(): Observable<Customer[] | undefined> {
    return this.repository.getAll()
      .pipe(map(customer => {
        return customer
      }));
  }

  getById(id: string): Observable< Customer | undefined> {
    // let customer: Customer | undefined;

    // this.repository.getById(id)
    //   ?.pipe(takeUntil(this.destroy$))
    //   ?.subscribe(result => {
    //     customer = result;
    //   });

    return this.repository.getById(id)
      ?.pipe(map(response => {
        return response;
      }));

    // return customer;
  }

  create(entity: Customer): Customer {
    let customer!: Customer;

    this.repository.create(entity)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        customer = result;
      });

    return customer;
  }

  createCustomerRegistration(entity: CustomerRegistration): Observable<CustomerRegistration> {
    entity.country = "BR";

    return this.repository.createCustomerRegistration(entity)
      .pipe(map(response => {
        return response;
      }));
  }

  update(id: string, entity: Customer): Customer {
    // TODO: Tratamento de erro caso o customer não seja encontrado.

    let newCustomer!: Customer;

    this.repository.getById(id)
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe(result => {
      if (result != undefined) {
        let customer = result;

        customer.name = entity.name;
        customer.cpf = entity.cpf;
        customer.gender = entity.gender;
        customer.phone = entity.phone;
        customer.email = entity.email;
        customer.address = entity.address;
        customer.complement = entity.complement;
        customer.neighborhood = entity.neighborhood;
        customer.county = entity.county;
        customer.UF = entity.UF;
        customer.zipCode = entity.zipCode;
        customer.active = entity.active;

        this.repository.update(id, customer)
        .pipe(takeUntil(this.destroy$))
          .subscribe(result => {
            newCustomer = result;
          });
      }
    });

    return newCustomer;
  }

  delete(id: string): boolean {
    let isDeleted!: boolean;

    this.repository.delete(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        isDeleted = result;
      });

    return isDeleted;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
