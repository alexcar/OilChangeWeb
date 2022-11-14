import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

// TODO: Quando a url tiver a palavra detail, significa que não é
// um registro de cliente, e sim a manutenção de um cliente.
// Quando for uma manutenção, precisa desabilitar a visualização de algumas
// partes da HTML.

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    const foo = "foo";
  }

  createCustomer(): void {
    this.router.navigateByUrl("/customers/thankyou");
  }

}
