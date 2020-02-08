import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Product from 'src/app/models/product.model';
import { Response } from 'src/app/models/response.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  products: any[] = [];
  allProducts: any;
  actualPage: number = 1;
  keys: any

  notFound: string = "";

  constructor(public activatedRoute: ActivatedRoute, public productService: ProductService,
  	public router: Router) { 
  	this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
  	this.showProducts();
  }

  async showProducts() {  
    try {
      this.allProducts = await this.productService.getProducts().catch(err => {
        throw err;
      });
      const lastIndex = this.router.url.lastIndexOf("/");
      const url = this.router.url.substring(lastIndex + 1);
      const parameters = url.split("%2B");      
      const items = this.allProducts;
      items.forEach((item) => {
        item.tags.forEach((tag) => {
            parameters.forEach((parameter) => {
                if(tag.toLowerCase() == parameter.toLowerCase()) {
                  this.products.push(item);                  
                }
            });
        });
      });
      
    } catch (err) {
      console.log(err);
    }
  }

}
