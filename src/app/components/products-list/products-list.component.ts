import { Component, OnInit } from '@angular/core';
import Product from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product;

  actualPage: number = 1;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.showProducts();
  }

  async showProducts() {
    try {
      this.products = await this.productService.getProducts().catch(err => {
        throw err;
      });
    } catch (err) {
      console.log(err);
    }
  }

}
