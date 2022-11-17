import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { CompanyService } from './../company.service';
import { CustomerList } from 'src/app/shared/models/customer-list';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

const ELEMENT_DATA: CustomerList[] = [
  { name: "José da Silva", email: "jose.silva@mail.com", active: true },
  { name: "Maria da Silva", email: "maria.silva@mail.com", active: true },
  { name: "João da Silva", email: "joao.silva@mail.com", active: false },
];

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['name', 'email', 'active', 'details'];
  dataSource = new MatTableDataSource<CustomerList>(ELEMENT_DATA);
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private router: Router,
    private service: CompanyService
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.titleService.setTitle('Troca Óleo - Clientes');
    // this.logger.log('Lista de clientes carregado');
    // this.notificationService.openSnackBar('Lista de clientes carregado');

    // const companies = this.service.getAll();
    // console.log(companies);
    // this.logger.log(companies);

    this.getCompanies();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createCustomer(): void {
    this.router.navigateByUrl("/company/customerDetail");
  }

  customerDetail(): void {
    this.router.navigateByUrl("/company/customerDetail");
  }

  getCompanies(): void {
    this.service.getAll2()
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe({
        next: (result) => {
          console.log(result);
        },
        error: (e) => {
          console.log(e);
          this.notificationService.openSnackBar("Ocorreu um erro interno. Favor tente novamente.");
        },
        complete: () => {
          this.notificationService.openSnackBar('Lista de clientes carregado');
        }
      });
  }

}
