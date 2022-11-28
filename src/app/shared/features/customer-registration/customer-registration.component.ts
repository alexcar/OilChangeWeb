import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { CustomerRegistration } from './../../models/customer-registration.model';
import { CustomerService } from './../../../features/customers/customer.service';
import { Gender } from '../../models/gender.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import  Validation from './../../validators/validation.password';
import { VehicleBrand } from './../../models/vehicle-brand.model';
import { VehicleFuel } from './../../models/vehicle-fuel.model';
import { VehicleModel } from './../../models/vehicle-model.model';
import { VehicleYear } from './../../models/vehicle-year.model';

// TODO: Quando a url tiver a palavra detail, significa que não é
// um registro de cliente, e sim a manutenção de um cliente.
// Quando for uma manutenção, precisa desabilitar a visualização de algumas
// partes da HTML.

// TODO: Implementar auto-complete nos campos cpf, email e login para verificar se já existe no back-end.

// export interface Subject1 {
//   name: string;
// }

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  submitted = false;
  customerRegistrationForm!: FormGroup;
  @ViewChild('chipList', { static: true }) chipList: any;
  GradeArray: any = [
    '8th Grade',
    '9th Grade'
  ];

  genders: Gender[] = [
    { id: "M", name: "Masculino" },
    { id: "F", name: "Feminino" },
  ];

  vehicleBrands: VehicleBrand[] = [
    { id: "DE578D8E-F317-4930-9260-DA0DC324268B", name: "Ford", active: true },
    { id: "27282F7B-A300-45C4-8B03-A7F5675F4037", name: "VW", active: true },
    { id: "D61FC229-5321-4A45-913E-17E3085589FA", name: "Fiat", active: true },
  ];

  vehicleModels: VehicleModel[] = [
    { id: "510A58AD-125E-4C05-AAD3-4CFF1912915C", name: "KA", active: true  },
    { id: "010F304D-BCC0-41D3-8ADA-6C494EC7D397", name: "Amarok", active: true  },
    { id: "4FC54966-675C-47DE-9D0D-01CCA418318A", name: "Toro", active: true  }
  ];

  vehicleYears: VehicleYear[] = [
    { id: "9A1100DA-A00E-40D6-B1F2-B597085EB0E6", name: "2020", active: true },
    { id: "3DBC655F-E532-4C76-B823-467D683E4050", name: "2021", active: true },
    { id: "063AC9E5-9A0F-4E1B-916D-B0A60EF389A3", name: "2022", active: true },
  ];

  vehicleFuels: VehicleFuel[] = [
    { id: "C851AB73-4A54-45D3-B33D-B3C634A4598D", name: "Álcool", active: true },
    { id: "DB3C1C31-5B57-43CE-8AB9-F6C2D67C8330", name: "Diesel", active: true },
    { id: "30128B5D-6FD1-43C3-B2D7-BF1D101F8B6D", name: "Flex", active: true },
    { id: "859B8788-1D05-4FA2-9EE9-2000DF58CE32", name: "Gasolina", active: true },
  ];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private titleService: Title,
    private service: CustomerService,
    private notificationService: NotificationService,
    ) { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.titleService.setTitle('Troca Óleo - Cadastro');
    this.reactiveForm();
  }

  reactiveForm() {
    this.customerRegistrationForm = this.fb.group({
      name: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      ddd: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      address:['', [Validators.required]],
      complement: [''],
      neighborhood: ['', [Validators.required]],
      county: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      licencePlate: ['', Validators.required],
      brandId: ['', [Validators.required]],
      modelId: ['', [Validators.required]],
      yearId: ['', [Validators.required]],
      fuelId: ['', [Validators.required]],
    }, {
      validators: [Validation.match('password', 'confirmPassword')]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    console.log(JSON.stringify(this.customerRegistrationForm.value, null, 2));

    if (this.customerRegistrationForm.invalid) {
      console.log('invalid');
      this.notificationService.openSnackBar('Não foi possível realizar o cadastro. Favor tente novamente.');
      return;
    }

    let customerRegistration: CustomerRegistration = this.customerRegistrationForm.value;

    this.service.createCustomerRegistration(customerRegistration)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          this.router.navigateByUrl("/customers/thankyou");
        },
        error: (error) => {
          // TODO: Tratar e gravar o erro no service.
          this.notificationService.openSnackBar(`Não foi possível realizar o cadastro. ${error.message}`);
        },
        complete: () => {
        }
      });

    // console.log(JSON.stringify(this.customerRegistrationForm.value, null, 2));
    // console.log(customerRegistration);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.customerRegistrationForm.controls;
  }

  public errorHandling = (control: string, error: string) => {
    return this.customerRegistrationForm.controls[control].hasError(error);
  }
}
