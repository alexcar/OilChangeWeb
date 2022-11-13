export class Customer {

  constructor(
    public id: number,
    public name: string,
    public cpf: string,
    public sex: string,
    public phone: string,
    public email: string,
    public address: string,
    public complement: string,
    public neighborhood: string,
    public county: string,
    public UF: string,
    public zipCode: string,
    public active: boolean,
  ) {}
}
