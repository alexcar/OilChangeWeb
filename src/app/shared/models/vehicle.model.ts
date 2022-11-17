import { subscriptionLogsToBeFn } from "rxjs/internal/testing/TestScheduler";

export class Vehicle {

  constructor(
    public id?: string,
    public customerId?: string,
    public licencePlate?: string,
    public modelId?: number,
    public model?: string,
    public brandId?: number,
    public brand?: string,
    public yearId?: number,
    public year?: string,
    public fuelId?: number,
    public fuel?: string,
    public active?: boolean
  ) {}
}
