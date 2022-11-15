import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-thank-you-customer',
  templateUrl: './thank-you-customer.component.html',
  styleUrls: ['./thank-you-customer.component.css']
})
export class ThankYouCustomerComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Troca Óleo - Primeiro Passo');
  }

}
