import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  products: any[] = []

  saveInCart(product: any) {
  	this.products.push(product);
    localStorage.setItem('cart', JSON.stringify(this.products));
  }

  getCart() {
    return localStorage.getItem('cart');
  }

  async updateCart(products: any[]) {
    localStorage.setItem('cart', JSON.stringify(products));
  }

}
