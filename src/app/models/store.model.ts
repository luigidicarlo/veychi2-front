import User from './user.model';

// Representa a una tienda en la aplicación.

// Aquellos usuarios que posean una tienda
// son considerados vendedores.

export default class Store {
  constructor(
    public _id: string,
    public name: string,
    public description: string,
    public user: User,
    public imageUrl: string,
    public rut: string,
    public activity: string,
    public createdAt: Date,
    public updatedAt: Date,
    public enabled: boolean,
    public active: boolean
  ) {}
}