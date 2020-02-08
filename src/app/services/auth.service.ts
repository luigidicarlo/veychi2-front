import { Injectable, EventEmitter } from "@angular/core";
import axios from "axios";
import { Response } from "../models/response.model";
import { environment } from 'src/environments/environment';
import User from '../models/user.model';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public onLoginEmitter = new EventEmitter<User>();
  public isLoggedIn = false;
  
  private apiBase = environment.apiBase;
  private cancelRequest = null;

  constructor() {}

  // Hace la petición a la API para recibir el JWT que
  // identifica al usuario.
  // @return resp: Promise<string>
  async generateToken(loginData: {
    username: string;
    password: string;
  }): Promise<string> {
    try {
      const aux = await axios({
        method: "post",
        url: `${this.apiBase}/login`,
        data: {
          username: loginData.username,
          password: loginData.password
        },
        headers: {
          "Content-Type": "application/json"
        },
        cancelToken: new axios.CancelToken(c => {
          this.cancelRequest = c;
        })
      })
      .catch(err => { throw err; });

      const res: Response = aux.data;

      if (!res.ok) {
        throw res.err;
      }

      return res.data as string;
    } catch (err) {
      throw err;
    }
  }

  // Guarda el token en localStorage para acceder
  // a él desde cualquier punto de la aplicación
  // @return void
  saveToken(token: string) {
    localStorage.setItem("session", token);
  }

  // Obtiene el token que esté guardado en
  // localStorage.
  // @return token: string
  loadSession(): string {
    return localStorage.getItem("session");
  }

  // Elimina el token de localStorage y emite un
  // evento para que todos los componentes se
  // actualicen.
  // @return void
  destroySession() {
    localStorage.removeItem("session");
    this.onLoginEmitter.emit(null);
  }

  // Cancela las peticiones que estén pendientes.
  // @return void
  cancelRequests() {
    this.cancelRequest();
  }
}
