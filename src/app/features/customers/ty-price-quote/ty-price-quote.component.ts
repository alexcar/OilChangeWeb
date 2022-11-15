import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ty-price-quote',
  templateUrl: './ty-price-quote.component.html',
  styleUrls: ['./ty-price-quote.component.css']
})
export class TyPriceQuoteComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Troca Óleo - Cotação de Preço');
  }

}
