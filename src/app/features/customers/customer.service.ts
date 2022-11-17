import { Injectable, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Customer } from './../../shared/models/customer.model';
import { CustomerRepository } from './customer.repository';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class CustomerService implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private repository: CustomerRepository) {}

  getAll(): Customer[] | undefined {
    let customers: Customer[] | undefined;

    // this.repository.getAll(this.getMyHeaders())
    //   ?.pipe(takeUntil(this.destroy$))
    //   ?.subscribe(result => {
    //     customers = result;
    //   });

    this.repository.getAll(this.getMyHeaders())
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe({
        next: (result) => {
          customers = result;
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          console.info('complete');
        }
      });

    return customers;
  }

  getById(id: string): Customer | undefined {
    let customer: Customer | undefined;

    this.repository.getById(id, this.getMyHeaders())
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe(result => {
        customer = result;
      });

    return customer;
  }

  create(entity: Customer): Customer {
    let customer!: Customer;

    this.repository.create(entity, this.getMyHeaders())
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        customer = result;
      });

    return customer;
  }

  update(id: string, entity: Customer): Customer {
    // TODO: Tratamento de erro caso o customer não seja encontrado.

    let newCustomer!: Customer;

    this.repository.getById(id, this.getMyHeaders())
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

        this.repository.update(id, customer, this.getMyHeaders())
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

    this.repository.delete(id, this.getMyHeaders())
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        isDeleted = result;
      });

    return isDeleted;
  }

  private getMyHeaders(): HttpHeaders {
    let myHeaders = new HttpHeaders();
    myHeaders = myHeaders.set("Access-Key", "<secret>");
    myHeaders = myHeaders.set("Application-Names", ["exampleApp", "proAngular"]);

    return myHeaders;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
