import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Response } from 'src/app/models/response.model';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  
  product: any;
  relatedProducts: any;
  productImages: any;
  constructor(public activatedRoute: ActivatedRoute, public productService: ProductService,
  public categoryService: CategoryService, public router: Router, public cart: CartService) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    this.findProduct(params.id);
  }

  findProduct(id: string) {    
    this.productService.getProduct(id).subscribe(
      (res: Response) => {
        console.log(res);
        if(res.ok) {
          this.product = res.data;
          this.productImages = this.product.images.map((item) => {
            return {
              image: item,
              thumbImage: item
            };
          });
          console.log(this.productImages);
          this.showRelatedProducts();
        }
      },
      err => console.log(err)
    );
  }

  showRelatedProducts() {
    this.categoryService.getCategoryProduct(this.product.category._id).subscribe(
      (res: Response) => {
        console.log(res);
        if(res.ok) {
          this.relatedProducts = res.data;
          console.log(this.relatedProducts);
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
