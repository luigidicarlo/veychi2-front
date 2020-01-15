import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from 'src/app/models/response.model';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  products: any[] = [];
  actualPage: number = 1;

  notFound: string = "";

  constructor(public activatedRoute: ActivatedRoute, public productService: ProductService,
  	public router: Router) { 
  	this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
  	this.showProducts();
  }

  showProducts() {
  	this.productService.getProducts().subscribe(
  		(res: Response) => {
  			const lastIndex = this.router.url.lastIndexOf("/");
  			const url = this.router.url.substring(lastIndex + 1);
  			const parameters = url.split("%2B");
  			console.log(parameters);
  			const items = res.data;
  			items.forEach((item) => {
  				console.log(item);
  				item.tags.forEach((tag) => {
  					parameters.forEach(parameter => {  						
  						if(parameter == tag.toLowerCase()) {
  							if(!this.products.length) {
  								this.products.push(item);
  								console.log(item);
  							}else {
  								this.products.forEach((product) => {
  									if(product._id != item._id) {
  										this.products.push(item);  										
  										console.log(item);
  									}
  								});
  							}  							
  						}
  					});
  				});
  			});
  			if(!this.products.length) this.notFound = "NO SE ENCONTRARON PRODUCTOS";
  			console.log(this.products);
  		},
  		err => console.log(err)
  	);
  }

}
