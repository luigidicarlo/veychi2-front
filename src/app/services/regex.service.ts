import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RegexService {
  public username = /^[a-zA-Z][a-zA-Z0-9_.-]+$/;
  public names = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\' ]+$/;
  public emails = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public rut = /^[0-9]+[-|‐]{1}[0-9kK]{1}$/;
  public storeNames = /^[$0-9a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\' ]+$/;
  public productNames = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\'. -]+$/;
  public couponNames = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\'_-]+$/;

  constructor() {}
}
