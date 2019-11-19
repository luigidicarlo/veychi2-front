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
      id: '1',
      name: 'Zapato',
      description: '',
      image: 'https://veychi.com/wp-content/plugins/wc-frontend-manager/assets/images/avatar.png',
      price: 18200,
      category: {
        id: '1',
        name: 'Ropa'
      }
    },
    {
      id: '2',
      name: 'Zapato',
      description: '',
      image: 'https://veychi.com/wp-content/plugins/wc-frontend-manager/assets/images/avatar.png',
      price: 18200,
      category: {
        id: '1',
        name: 'Ropa'
      }
    },
    {
      id: '3',
      name: 'Zapato',
      description: '',
      image: 'https://veychi.com/wp-content/plugins/wc-frontend-manager/assets/images/avatar.png',
      price: 18200,
      category: {
        id: '1',
        name: 'Comida'
      }
    },
    {
      id: '4',
      name: 'Zapato',
      description: '',
      image: 'https://veychi.com/wp-content/plugins/wc-frontend-manager/assets/images/avatar.png',
      price: 18200,
      category: {
        id: '1',
        name: 'Libros'
      }
    },
    {
      id: '5',
      name: 'Zapato',
      description: '',
      image: 'https://veychi.com/wp-content/plugins/wc-frontend-manager/assets/images/avatar.png',
      price: 18200,
      category: {
        id: '1',
        name: 'Comida'
      }
    },
    {
      id: '6',
      name: 'Zapato',
      description: '',
      image: 'https://veychi.com/wp-content/plugins/wc-frontend-manager/assets/images/avatar.png',
      price: 18200,
      category: {
        id: '1',
        name: 'Ropa'
      }
    }
  ];

  actualPage: number = 1;

  constructor() { }

  ngOnInit() {
  }

}
