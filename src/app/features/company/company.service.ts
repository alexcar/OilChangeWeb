import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Company } from 'src/app/shared/models/company.model';
import { CompanyRepository } from './company.repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class CompanyService implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private repository: CompanyRepository, private http: HttpClient) {}

  getAll(): Company[] | undefined {
    let companies: Company[] | undefined;

    this.repository.getAll(this.getMyHeaders())
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

  getAll2(): Observable<Company[] | undefined> {
    return this.repository.getAll(this.getMyHeaders());
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
