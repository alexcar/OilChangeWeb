import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PriceQuoteItem } from 'src/app/shared/models/price-quote-item.model';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';

const ELEMENT_DATA: PriceQuoteItem[] = [
  { id: 1, productName: "Óleo sintético W40", manufacturerName: "Lubrax", quantity: 3, unitPrice: 100.00, subtotal: 300.00 },
  { id: 2, productName: "Filtro de óleo", manufacturerName: "Lubrax", quantity: 1, unitPrice: 55.99, subtotal: 55.99 }
];

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
  displayedColumns: string[] = ['id', 'productName', 'manufacturerName', 'quantity', 'unitPrice', 'subtotal'];
  dataSource = new MatTableDataSource<PriceQuoteItem>(ELEMENT_DATA);

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private titleService: Title,
    private logger: NGXLogger) { }

  ngOnInit(): void {
    this.titleService.setTitle('Troca Óleo - Pedido de Compra');
    this.logger.log('Pedido de Compra carregado');
    this.notificationService.openSnackBar('Pedido de Compra carregado');
  }

  updatePurchaseOrder(): void {
    this.notificationService.openSnackBar('Pedido de compra alterado com sucesso!');
  }

  returnPurchaseOrderList(): void {
    this.router.navigateByUrl("/company");
  }

}
