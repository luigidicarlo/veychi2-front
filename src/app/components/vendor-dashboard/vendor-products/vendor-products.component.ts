import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-vendor-products',
  templateUrl: './vendor-products.component.html',
  styleUrls: ['./vendor-products.component.css']
})
export class VendorProductsComponent implements OnInit {

  products: Product[] = [
    {
      name: 'Zapato',
      description: '',
      image: 'https://veychi.com/wp-content/plugins/wc-frontend-manager/assets/images/avatar.png',
      price: 18200
    },
    {
      name: 'Zapato',
      description: '',
      image: 'https://veychi.com/wp-content/plugins/wc-frontend-manager/assets/images/avatar.png',
      price: 18200
    },
    {
      name: 'Zapato',
      description: '',
      image: 'https://veychi.com/wp-content/plugins/wc-frontend-manager/assets/images/avatar.png',
      price: 18200
    },
    {
      name: 'Zapato',
      description: '',
      image: 'https://veychi.com/wp-content/plugins/wc-frontend-manager/assets/images/avatar.png',
      price: 18200
    },
    {
      name: 'Zapato',
      description: '',
      image: 'https://veychi.com/wp-content/plugins/wc-frontend-manager/assets/images/avatar.png',
      price: 18200
    },
    {
      name: 'Zapato',
      description: '',
      image: 'https://veychi.com/wp-content/plugins/wc-frontend-manager/assets/images/avatar.png',
      price: 18200
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
