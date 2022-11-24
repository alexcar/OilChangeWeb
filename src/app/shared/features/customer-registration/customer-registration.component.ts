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
    '9th GRade'
  ];

  genders: Gender[] = [
    { id: "M", name: "Masculino" },
    { id: "F", name: "Feminino" },
  ];

  vehicleBrands: VehicleBrand[] = [
    { id: "57414a44-7d33-4aff-9cfe-a8638383f74c", name: "Ford", active: true },
    { id: "e70067fb-27c7-4456-af52-9b8ad0f5599f", name: "VW", active: true },
    { id: "d04bf95b-7a20-4779-9b45-ac7c194a2537", name: "Fiat", active: true },
  ];

  vehicleModels: VehicleModel[] = [
    { id: "8fb4b710-23bb-4831-af6e-5d2199476a5f", name: "KA", active: true  },
    { id: "0c8366ee-fdd4-43ca-981f-0085ca233438", name: "Amarok", active: true  },
    { id: "e56a67ff-167e-4b54-a3b0-43d49eddd963", name: "Toro", active: true  }
  ];

  vehicleYears: VehicleYear[] = [
    { id: "c7619efb-01a1-44ac-a4dd-447cbf9b191d", name: "2017", active: true },
    { id: "83593598-56dc-44ec-bf9a-34658de4efc6", name: "2018", active: true },
    { id: "14356049-fa9d-4b38-aa4a-be9730f5c2fd", name: "2019", active: true },
    { id: "addf70da-6e83-4b87-a443-0880ca949465", name: "2020", active: true },
    { id: "73d865ab-e943-40dc-8e5d-28a49f5441e1", name: "2021", active: true },
    { id: "832ae434-0f45-428f-9214-d303c3399654", name: "2022", active: true },
  ];

  vehicleFuels: VehicleFuel[] = [
    { id: "79aed849-23ff-4d48-9b27-bbb24f812d32", name: "Álcool", active: true },
    { id: "b2a79208-7050-4780-b8ec-da60792ed066", name: "Diesel", active: true },
    { id: "911b6cc2-90e0-478f-b14b-8b971a6340ff", name: "Flex", active: true },
    { id: "f67fb0f4-2b74-4e1d-b275-934b2b42880e", name: "Gasolina", active: true },
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
        error: (e) => {
          // TODO: Tratar e gravar o erro no service.
          const erro = e;
          this.notificationService.openSnackBar(`Não foi possível realizar o cadastro. ${erro.message}`);
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
