import { Component, OnInit } from '@angular/core';

import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  checked = false;
  constructor(
    private router: Router,
    private notificationService: NotificationService,) { }

  ngOnInit(): void {
    const foo = "foo";
  }

  createVehicle(): void {
    this.notificationService.openSnackBar('Veículo cadastrado com sucesso!');
  }

  createCustomer(): void {
    this.router.navigateByUrl("/customers/thankyou");
  }

}
