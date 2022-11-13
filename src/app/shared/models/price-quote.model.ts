export class PriceQuote {

  constructor(
    public id?: number,
    public number?: string,
    public companyName?: string,
    public sendDate?: string,
    public expirationDate?: string,
    public serviceName?: string,
    public vehicle?: string,
    public amount?: string,
    public status?: string
  ) {}
}
