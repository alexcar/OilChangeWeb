import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PurchageOrder } from 'src/app/shared/models/purchase-order.model';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

const ELEMENT_DATA: PurchageOrder[] = [
  { id: 1, customerName: "Cliente I", licencePlate: "SO-5180", vehicleModel: "Fusca", appointmentDateTime: "15/10/2022 09:00", startServiceExecution: "09:00", endServiceExecution: "10:45", status: "Enviada" },
  { id: 2, customerName: "Cliente II", licencePlate: "FMS-9686", vehicleModel: "Ford KA", appointmentDateTime: "15/10/2022 09:00", startServiceExecution: "", endServiceExecution: "", status: "Respondida"  },
  { id: 3, customerName: "Cliente III", licencePlate: "SO-5180", vehicleModel: "Fusca", appointmentDateTime: "15/10/2022 09:00", startServiceExecution: "", endServiceExecution: "", status: "Agendamento"  }
]

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.css']
})
export class PurchaseOrderListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['customerName', 'licencePlate', 'vehicleModel', 'appointmentDateTime', 'startServiceExecution', 'endServiceExecution', 'status', 'detalhes'];
  dataSource = new MatTableDataSource<PurchageOrder>(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle('Troca Óleo - Pedidos de Compra');
    this.logger.log('Pedidos de compra carregado');
    this.notificationService.openSnackBar('Pedidos de compra carregado');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  purchaseOrderDetail(): void {
    this.router.navigateByUrl("/company/purchaseOrderDetail");
  }

}
