import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

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
