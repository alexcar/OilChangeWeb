import { Vehicle } from "./vehicle.model";

export class Customer {

  constructor(
    public id?: string,
    public name?: string,
    public cpf?: string,
    public gender?: string,
    public phone?: string,
    public email?: string,
    public password?: string,
    public address?: string,
    public complement?: string,
    public neighborhood?: string,
    public county?: string,
    public UF?: string,
    public zipCode?: string,
    public country?: string,
    public active?: boolean,
    public userUpdate?: string,
    public vehicles?: Vehicle[]
  ) {}
}
