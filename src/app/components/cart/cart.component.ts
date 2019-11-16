import { Component, OnInit } from '@angular/core';
import { Cart } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }

  cart: Cart[] = [
    {
      product: {
        name: 'Zapatos',
        description: 'Zapatos lorem ipsum dolor lorem ipsum dolor',
        image: 'https://http2.mlstatic.com/customs-ba-zapatos-hombre-botitas-eco-cuero-vestir-keyw-full-D_NQ_NP_853759-MLA31102426796_062019-Q.jpg',
        price: 50
      },
      quantity: 2
    },
    {
      product: {
        name: 'Camisa',
        description: 'Camisa lorem ipsum dolor lorem ipsum dolor',
        image: 'http://www.hikoreanfashion.com/76776-thickbox_default/blanca-sin-cuello-dise%C3%B1ador-manga-larga-casual-camisas-de-vestir.jpg',
        price: 35
      },
      quantity: 2
    }
  ];

  ngOnInit() {
  }

  total() {

  }
  
}
