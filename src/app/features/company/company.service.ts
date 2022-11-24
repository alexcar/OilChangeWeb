import { Injectable, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Company } from 'src/app/shared/models/company.model';
import { CompanyRepository } from './company.repository';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class CompanyService implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private repository: CompanyRepository, private http: HttpClient) {}

  getAll(): Company[] | undefined {
    let companies: Company[] | undefined;

    this.repository.getAll()
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe({
        next: (result) => {
          companies = result;
          console.log(companies);
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          console.info('complete');
        }
      });

    return companies;
  }

  // getCurrentUser(): any {
  //   return JSON.parse(localStorage.getItem('currentUser') || '{}');
  // }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
