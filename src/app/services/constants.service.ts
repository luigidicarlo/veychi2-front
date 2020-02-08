import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ConstantsService {
  public readonly minPrice = 0.01;
  public readonly maxPrice = 999999999999.99;
  public readonly minDiscount = 0;
  public readonly maxDiscount = 100;
  public readonly descMinLength = 20;
  public readonly descMaxLength = 2000;
  public readonly shortDescMinLength = 20;
  public readonly shortDescMaxLength = 200;
  public readonly namesMinLength = 3;
  public readonly namesMaxLength = 128;
  public readonly usernameMinLength = 8;
  public readonly usernameMaxLength = 32;
  public readonly recoverTokenExp = 3600 * 48 * 1000;

  constructor() {}
}
