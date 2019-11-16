import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [
    {
      name: 'Zapatos',
      description: 'Zapatos lorem ipsum dolor lorem ipsum dolor',
      image: 'https://http2.mlstatic.com/customs-ba-zapatos-hombre-botitas-eco-cuero-vestir-keyw-full-D_NQ_NP_853759-MLA31102426796_062019-Q.jpg',
      price: 50
    },
    {
      name: 'Camisa',
      description: 'Camisa lorem ipsum dolor lorem ipsum dolor',
      image: 'http://www.hikoreanfashion.com/76776-thickbox_default/blanca-sin-cuello-dise%C3%B1ador-manga-larga-casual-camisas-de-vestir.jpg',
      price: 35
    },
    {
      name: 'Pantalones',
      description: 'Pantalones lorem ipsum dolor lorem ipsum dolor',
      image: 'https://images-na.ssl-images-amazon.com/images/I/51GOS10o5pL._SX569_.jpg',
      price: 45
    },
    {
      name: 'Alfombras',
      description: 'Alfombras',
      image: 'https://alfombrasalacarta.com/828-superlarge_default/alfombras-pelo-semi-largo-suave-soft-shaggy.jpg',
      price: 99
    },
    {
      name: 'Guantes',
      description: 'Guantes',
      image: 'https://product-images.weber.com/accessory-images/6535.png',
      price: 15
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
