import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-send-price-quote',
  templateUrl: './send-price-quote.component.html',
  styleUrls: ['./send-price-quote.component.css']
})
export class SendPriceQuoteComponent implements OnInit {

  constructor(private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Troca Óleo - Cotação de Preço');
  }

  sendPriceQuote(): void {
    this.router.navigateByUrl("customers/thankYouPriceQuote");
  }
}
