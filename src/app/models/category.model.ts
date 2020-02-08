// Representa a una categoría de producto.

export default class Category {
  constructor(
    public _id: string,
    public name: string,
    public parent: Category | string,
    public imageUrl: string,
    public createdAt: Date,
    public updatedAt: Date,
    public active: boolean
  ) {}
}
