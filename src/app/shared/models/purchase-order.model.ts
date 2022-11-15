export class PurchageOrder {

  constructor(
    public id?: number,
    public customerName?: string,
    public licencePlate?: string,
    public vehicleModel?: string,
    public appointmentDateTime?: string,
    public startServiceExecution?: string,
    public endServiceExecution?: string,
    public status?: string
  ) {}
}
