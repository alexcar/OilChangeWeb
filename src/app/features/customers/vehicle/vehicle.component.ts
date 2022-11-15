import { Component, OnInit } from '@angular/core';

import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  checked = false;
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private titleService: Title,) { }

  ngOnInit(): void {
    this.titleService.setTitle('Troca Óleo - Veículo');
  }

  createVehicle(): void {
    this.notificationService.openSnackBar('Veículo cadastrado com sucesso!');
  }

  createCustomer(): void {
    this.router.navigateByUrl("/customers/thankyou");
  }

}
