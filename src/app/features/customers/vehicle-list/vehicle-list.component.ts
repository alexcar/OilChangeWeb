import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Vehicle } from './../../../shared/models/vehicle.model';

const ELEMENT_DATA: Vehicle[] = [
  { name: "Fusca", model: "1500", year: "1973", fuel: "Gasolina", licencePlate: "SO-5180", active: true },
  { name: "Fusca", model: "1500", year: "1973", fuel: "Gasolina", licencePlate: "SO-5180", active: true },
  { name: "Fusca", model: "1500", year: "1973", fuel: "Gasolina", licencePlate: "SO-5180", active: true }
];

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'model', 'year', 'fuel', 'licencePlate', 'status', 'detalhes'];
  dataSource = new MatTableDataSource<Vehicle>(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Troca Óleo - Veículos');
    this.logger.log('Lista de veículos carregada');
    this.notificationService.openSnackBar('Lista de veículos carregada');
  }

  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createVehicle(): void {
    this.router.navigateByUrl("/customers/vehicle");
  }

  vehicleDetails(): void {
    this.router.navigateByUrl("/customers/vehicle");
  }
}
