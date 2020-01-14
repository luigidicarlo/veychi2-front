import { Component, OnInit, Input } from "@angular/core";
import { environment } from "src/environments/environment";
import Product from 'src/app/models/product.model';

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  @Input()
  public product: Product;

  @Input()
  public discountType = false;

  public image = environment.logoUrl;

  constructor() {}

  ngOnInit() {
    if (this.product.images.length) {
      this.image = this.product.images[0];
    }
  }
}
