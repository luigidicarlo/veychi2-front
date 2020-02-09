import { Component, OnInit } from "@angular/core";
import Product from "../../models/product.model";
import Category from "../../models/category.model";
import { ProductService } from "../../services/product.service";
import { CategoryService } from "../../services/category.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  products: Product[];
  categories: Category[];
  activeIndex: number = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.showProducts();
    this.showCategories();
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

  async showCategories() {
    try {
      this.categories = await this.categoryService
        .getCategories()
        .catch(err => {
          throw err;
        });
    } catch (err) {
      console.log(err);
    }
  }
}
