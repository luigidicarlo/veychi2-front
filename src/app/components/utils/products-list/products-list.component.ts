import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { Response } from '../../../models/response.model';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: any[] = [];

  p: any[] = [];

  cartProduct: any[] = [];

  actualPage: number = 1;

  constructor(private productService: ProductService, private cart: CartService) { }

  ngOnInit() {
    this.showProducts();
  }

  showProducts() {
    this.productService.getProducts().subscribe(
      (res: Response) => {
        if(res.ok) {
          this.products = res.data
        }        
      },
      err => console.log(err)
    );
  }

  saveCart(product: any) {
    console.log(product);
    this.cart.saveInCart(product);
  }

}
