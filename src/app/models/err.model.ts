// Representa un mensaje de error que se haya
// recibido luego de realizar una petición
// asíncrona a la API.

export default class Err {
  constructor(
    public stack: string,
    public message: string
  ) {}
}