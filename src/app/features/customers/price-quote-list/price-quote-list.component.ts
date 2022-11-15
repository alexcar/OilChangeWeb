import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PriceQuote } from 'src/app/shared/models/price-quote.model';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

const ELEMENT_DATA: PriceQuote[] =  [
  {
    number: "001", companyName: "Troca Óleo", sendDate: "01/11/2022", expirationDate: "15/11/2022",
    serviceName: "Troca de Óleo", vehicle: "Fusca", amount: "175,00", status: "Enviada"
  },
  {
    number: "002", companyName: "Troca Óleo", sendDate: "05/11/2022", expirationDate: "15/11/2022",
    serviceName: "Troca de Óleo", vehicle: "Passat", amount: "175,00", status: "Respondida"
  },
  {
    number: "003", companyName: "Troca Óleo", sendDate: "01/11/2022", expirationDate: "15/11/2022",
    serviceName: "Troca de Óleo", vehicle: "Fiat Uno", amount: "175,00", status: "Agendamento"
  },
  {
    number: "004", companyName: "Troca Óleo", sendDate: "01/11/2022", expirationDate: "15/11/2022",
    serviceName: "Troca de Óleo", vehicle: "Novo Ka", amount: "175,00", status: "Executando"
  },
  {
    number: "005", companyName: "Troca Óleo", sendDate: "05/11/2022", expirationDate: "15/11/2022",
    serviceName: "Troca de Óleo", vehicle: "Voyagem", amount: "175,00", status: "Fechada"
  },
  {
    number: "006", companyName: "Troca Óleo", sendDate: "01/11/2022", expirationDate: "15/11/2022",
    serviceName: "Troca de Óleo", vehicle: "Corcel", amount: "175,00", status: "Cancelada"
  },
  {
    number: "007", companyName: "Troca Óleo", sendDate: "01/11/2022", expirationDate: "15/11/2022",
    serviceName: "Troca de Óleo", vehicle: "Chevette", amount: "175,00", status: "Enviada"
  },
  {
    number: "008", companyName: "Troca Óleo", sendDate: "05/11/2022", expirationDate: "15/11/2022",
    serviceName: "Troca de Óleo", vehicle: "Opala", amount: "175,00", status: "Enviada"
  },
  {
    number: "009", companyName: "Troca Óleo", sendDate: "01/11/2022", expirationDate: "15/11/2022",
    serviceName: "Troca de Óleo", vehicle: "Bugre", amount: "175,00", status: "Enviada"
  },
  {
    number: "010", companyName: "Troca Óleo", sendDate: "01/11/2022", expirationDate: "15/11/2022",
    serviceName: "Troca de Óleo", vehicle: "Dakota", amount: "175,00", status: "Enviada"
  },
  {
    number: "011", companyName: "Troca Óleo", sendDate: "05/11/2022", expirationDate: "15/11/2022",
    serviceName: "Troca de Óleo", vehicle: "Land Rover", amount: "175,00", status: "Enviada"
  },
  {
    number: "012", companyName: "Troca Óleo", sendDate: "01/11/2022", expirationDate: "15/11/2022",
    serviceName: "Troca de Óleo", vehicle: "Onix", amount: "175,00", status: "Enviada"
  }
];

@Component({
  selector: 'app-price-quote-list',
  templateUrl: './price-quote-list.component.html',
  styleUrls: ['./price-quote-list.component.css']
})
export class PriceQuoteListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['number', 'expirationDate', 'serviceName', 'vehicle', 'amount', 'status', 'detalhes'];
  dataSource = new MatTableDataSource<PriceQuote>(ELEMENT_DATA);

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
    this.titleService.setTitle('Troca Óleo - Cotações de Preço');
    this.logger.log('Cotações de preço carregada');
    this.notificationService.openSnackBar('Lista de cotações de preço carregada');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createPriceQuote(): void {
    this.router.navigateByUrl("/customers/sendPriceQuote");
  }

  priceQuoteDetail(): void {
    this.router.navigateByUrl("/customers/priceQuoteDetail");
  }

}
