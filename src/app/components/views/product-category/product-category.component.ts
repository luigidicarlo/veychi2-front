import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Product } from 'src/app/models/product.model';
import { CategoryService } from '../../../services/category.service';
import { Response } from '../../../models/response.model';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  products: Product[] = []   

  actualPage: number = 1;
  
  constructor(private activatedRoute: ActivatedRoute, private categoryService: CategoryService,
  private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.showProducts();
  }

  showProducts() {
    const params = this.activatedRoute.snapshot.params;
    this.categoryService.getCategoryProduct(params.id).subscribe(
      (res: Response) => {
        console.log(res);
        if(res.ok) {
          this.products = res.data;
        }
      },
      err => console.log(err)
    );
  }

}
