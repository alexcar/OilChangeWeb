import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { PriceQuote } from 'src/app/shared/models/price-quote.model';
import { PriceQuoteItem } from 'src/app/shared/models/price-quote-item.model';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

const ELEMENT_DATA: PriceQuoteItem[] = [
  { id: 1, productName: "Óleo sintético W40", manufacturerName: "Lubrax", quantity: 3, unitPrice: 100.00, subtotal: 300.00 },
  { id: 2, productName: "Filtro de óleo", manufacturerName: "Lubrax", quantity: 1, unitPrice: 55.99, subtotal: 55.99 }
];


@Component({
  selector: 'app-price-quote-detail',
  templateUrl: './price-quote-detail.component.html',
  styleUrls: ['./price-quote-detail.component.css']
})
export class PriceQuoteDetailComponent implements OnInit {
  priceQuote!: PriceQuote;
  displayedColumns: string[] = ['id', 'productName', 'manufacturerName', 'quantity', 'unitPrice', 'subtotal'];
  dataSource = new MatTableDataSource<PriceQuoteItem>(ELEMENT_DATA);

  constructor(private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Troca Óleo - Cotação de Preço');
    this.priceQuote = new PriceQuote(
      1, "001", "Troca Óleo", "01/11/2022", "15/11/2022", "troca óleo", "Fusca", "100,00", "Aprovada");
    }

    returnQuoteList(): void {
      this.router.navigateByUrl("/customers");
  }

}
