
export class PriceQuoteItem {

  constructor(
    public id: number,
    public productName: string,
    public manufacturerName: string,
    public quantity: number,
    public unitPrice: number,
    public subtotal: number
  ) {}
}
