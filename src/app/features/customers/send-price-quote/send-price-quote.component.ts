import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-send-price-quote',
  templateUrl: './send-price-quote.component.html',
  styleUrls: ['./send-price-quote.component.css']
})
export class SendPriceQuoteComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    const foo = "foo";
  }

  sendPriceQuote(): void {
    this.router.navigateByUrl("customers/thankYouPriceQuote");
  }
}
