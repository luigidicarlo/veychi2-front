import Store from './store.model';

// Representa a un cupón de descuento.

export default class Coupon {
  constructor(
    public _id: string,
    public name: string,
    public expiration: Date,
    public value: number,
    public percentage: boolean,
    public store: Store,
    public createdAt: Date,
    public updatedAt: Date,
    public enabled: boolean,
    public active: boolean
  ) {}
}