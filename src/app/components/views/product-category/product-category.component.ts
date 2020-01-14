import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Product } from 'src/app/models/product.model';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { Response } from '../../../models/response.model';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  products: Product[] = [];
  storeID = null;

  actualPage: number = 1;
  
  constructor(public activatedRoute: ActivatedRoute, public categoryService: CategoryService,
  public router: Router, public productService: ProductService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.showProducts();
  }

  showProducts() {
    if(this.router.url.includes("categorias")) {
      const params = this.activatedRoute.snapshot.params;
      this.categoryService.getCategoryProduct(params.id).subscribe(
        (res: Response) => {
          if(res.ok) {
            this.products = res.data;
          }
        },
        err => console.log(err)
      );  
    } else if(this.router.url.includes("vendor-products")) {
      this.storeID = this.activatedRoute.snapshot.params.id;
      this.productService.getProducts().subscribe(
        (res: Response) => {
          if(res.ok) {
            this.products = res.data
          }        
        },
        err => console.log(err)
      );
    }
  }

}
