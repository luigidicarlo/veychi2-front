import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Response } from 'src/app/models/response.model';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  
  product: any; 
  productImages: any;
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) { }

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
        }
      },
      err => console.log(err)
    );
  }

}
