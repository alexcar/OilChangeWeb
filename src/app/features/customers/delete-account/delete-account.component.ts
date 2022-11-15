import { Component, OnInit } from '@angular/core';

import { NGXLogger } from 'ngx-logger';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {
  isDeleteAccount = false;
  isConfirmDeleteAccount = false;
  customerName = "José da Silva";
  typedName = "";

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Troca Óleo - Excluir Conta');
    this.typedName = "";
  }

  deleteAccount(): void {
    this.isDeleteAccount = true;
  }

  confirmAccountDeletion(event: Event): void {
    const customerNameValue = (event.target as HTMLInputElement).value;

    if (customerNameValue.trim() == this.customerName.trim()){
      this.isConfirmDeleteAccount = true;
    } else {
      this.isConfirmDeleteAccount = false;
    }
  }

  permanentlyDeleteAccount(): void {
    this.logger.log('conta excluída');
    this.notificationService.openSnackBar('Conta excluída com sucesso');
  }
}
