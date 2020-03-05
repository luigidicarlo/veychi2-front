import User from './user.model';
import Product from './product.model';
import Coupon from './coupon.model';

// Representa una orden o un pedido
// en la aplicación.

export default class Order {
  constructor(
    public _id: string,
    public products: string[]|Product,
    public coupons: string[]|Coupon,
    public subtotal: number,
    public total: number,
    public user: User,
    public status: string,
    public createdAt: Date,
    public updatedAt: Date,
    public active: boolean,
    public enabled: boolean
  ) {}
}