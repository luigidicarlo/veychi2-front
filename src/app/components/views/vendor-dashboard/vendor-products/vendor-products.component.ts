import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Response } from '../../../../models/response.model';
import { ProductService } from '../../../../services/product.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-vendor-products',
  templateUrl: './vendor-products.component.html',
  styleUrls: ['./vendor-products.component.css']
})
export class VendorProductsComponent implements OnInit {

  products: Product[] = [];

  actualPage: number = 1;

  token: any;

  constructor(public productService: ProductService, public auth: AuthService,
    public router: Router) { }

  ngOnInit() {
    this.token = this.auth.loadSession();
    this.showProducts();
  }

  showProducts() {
    console.log("Getting products...");
    this.productService.getProducts().subscribe(
      (res: Response) => {
        console.log("Nailed it");
        console.log(res);
        this.products = res.data;
      },
      err => console.log(err)
    );
  }

  editProduct(id: string) {
    this.router.navigate([`/vendor-panel/editar-producto/${id}`]);
  }

  eraseProduct(id: string) {
    this.productService.deleteProduct(id, this.token).subscribe(
      (res: Response) => {
        console.log(res);
        if(res.ok) {
          this.showProducts();
        }
      },
      err => console.log(err)
    );
  }

}
