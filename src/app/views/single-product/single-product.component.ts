import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import Product from "src/app/models/product.model";
import { Response } from "src/app/models/response.model";
import { ProductService } from "../../services/product.service";
import { CategoryService } from "../../services/category.service";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "app-single-product",
  templateUrl: "./single-product.component.html",
  styleUrls: ["./single-product.component.css"]
})
export class SingleProductComponent implements OnInit {
  public product: Product;
  public relatedProducts: Product[];
  public productImages: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public productService: ProductService,
    public categoryService: CategoryService,
    public router: Router,
    public cart: CartService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    this.findProduct(params.id);
  }

  async findProduct(id: string) {
    try {
      this.product = await this.productService.getProduct(id).catch(err => {
        throw err;
      });
      console.log(this.product);
      this.productImages = this.product.images.map(item => {
        return {
          image: item,
          thumbImage: item
        };
      });
      this.showRelatedProducts();
    } catch (err) {
      console.log(err);
    }
  }

  async showRelatedProducts() {
    try {
      this.relatedProducts = await this.categoryService
        .getCategoryProduct(this.product.category._id)
        .catch(err => {
          throw err;
        });
    } catch (err) {
      console.log(err);
    }
  }

  saveCart(product: any) {
    console.log(product);
    this.cart.saveInCart(product);
  }
}
