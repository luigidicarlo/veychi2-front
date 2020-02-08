// Representa a un usuario en la aplicación.

// Hay tres (3) roles fundamentales:
// * Administrador
// * Vendedor
// * Cliente

export default class User {
  constructor(
    public _id: string,
    public username: string,
    public fname: string,
    public lname: string,
    public email: string,
    public password: string,
    public role: string,
    public imageUrl: string,
    public createdAt: Date,
    public updatedAt: Date,
    public active: boolean
  ) {}
}