import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../models/cart.model';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) { }

  cart: any[] = [];

  ngOnInit() {
    this.getCartProducts();
  }
  
  getCartProducts() {
    this.cart = JSON.parse(this.cartService.getCart());    
    console.log(this.cart);
  }

  async deleteCartProduct(index: number) {    
    this.cart.splice(index, 1);    
    await this.cartService.updateCart(this.cart);
    this.getCartProducts();
  }


  
}
