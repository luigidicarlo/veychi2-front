import Store from './store.model';
import Category from './category.model';

// Representa a un producto en la aplicación.

export default class Product {
  constructor(
    public _id: string,
    public name: string,
    public description: string,
    public shortDescription: string,
    public price: number,
    public discount: number,
    public sku: string,
    public images: string[],
    public tags: string[],
    public store: Store,
    public category: Category | any,
    public timesSold: number,
    public featured: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public enabled: boolean,
    public active: boolean
  ) {}
}