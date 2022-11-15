import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { NGXLogger } from 'ngx-logger';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.css']
})
export class CustomerAccountComponent implements OnInit {
  rota = "";

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private router: Router,
    activedRoute: ActivatedRoute
  ) {
    this.rota = activedRoute.snapshot.url[0].path;
  }

  ngOnInit(): void {
    this.titleService.setTitle('Troca Óleo - Cadastro');
    this.logger.log('Minha conta carregada');
    this.notificationService.openSnackBar('Minha conta carregada');
  }

  updateCustomer(): void {

  }

  returnCustomerList(): void {
    this.router.navigateByUrl("/company/customers");
  }

}
