import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';


@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  products: Product[] = [
    {
      id: '1',
      name: 'Zapatos',
      description: 'Zapatos lorem ipsum dolor lorem ipsum dolor',
      image: 'https://http2.mlstatic.com/customs-ba-zapatos-hombre-botitas-eco-cuero-vestir-keyw-full-D_NQ_NP_853759-MLA31102426796_062019-Q.jpg',
      price: 50,
      category: {
        id: '1',
        name: 'Comida'
      }
    },
    {
      id: '40',
      name: 'Camisa',
      description: 'Camisa lorem ipsum dolor lorem ipsum dolor',
      image: 'http://www.hikoreanfashion.com/76776-thickbox_default/blanca-sin-cuello-dise%C3%B1ador-manga-larga-casual-camisas-de-vestir.jpg',
      price: 35,
      category: {
        id: '1',
        name: 'Comida'
      }
    },
    {
      id: '2',
      name: 'Pantalones',
      description: 'Pantalones lorem ipsum dolor lorem ipsum dolor',
      image: 'https://images-na.ssl-images-amazon.com/images/I/51GOS10o5pL._SX569_.jpg',
      price: 45,
      category: {
        id: '1',
        name: 'Ropa'
      }
    },
    {
      id: '3',
      name: 'Alfombras',
      description: 'Alfombras',
      image: 'https://alfombrasalacarta.com/828-superlarge_default/alfombras-pelo-semi-largo-suave-soft-shaggy.jpg',
      price: 99,
      category: {
        id: '1',
        name: 'Libros'
      }
    },
    {
      id: '4',
      name: 'Guantes',
      description: 'Guantes',
      image: 'https://product-images.weber.com/accessory-images/6535.png',
      price: 15,
      category: {
        id: '1',
        name: 'Ropa'
      }
    },
    {
      id: '5',
      name: 'Zapatos',
      description: 'Zapatos lorem ipsum dolor lorem ipsum dolor',
      image: 'https://http2.mlstatic.com/customs-ba-zapatos-hombre-botitas-eco-cuero-vestir-keyw-full-D_NQ_NP_853759-MLA31102426796_062019-Q.jpg',
      price: 50,
      category: {
        id: '1',
        name: 'Comida'
      }
    },
    {
      id: '6',
      name: 'Camisa',
      description: 'Camisa lorem ipsum dolor lorem ipsum dolor',
      image: 'http://www.hikoreanfashion.com/76776-thickbox_default/blanca-sin-cuello-dise%C3%B1ador-manga-larga-casual-camisas-de-vestir.jpg',
      price: 35,
      category: {
        id: '1',
        name: 'Ropa'
      }
    },
    {
      id: '7',
      name: 'Pantalones',
      description: 'Pantalones lorem ipsum dolor lorem ipsum dolor',
      image: 'https://images-na.ssl-images-amazon.com/images/I/51GOS10o5pL._SX569_.jpg',
      price: 45,
      category: {
        id: '1',
        name: 'Ropa'
      }
    },
    {
      id: '8',
      name: 'Alfombras',
      description: 'Alfombras',
      image: 'https://alfombrasalacarta.com/828-superlarge_default/alfombras-pelo-semi-largo-suave-soft-shaggy.jpg',
      price: 99,
      category: {
        id: '1',
        name: 'Libros'
      }
    },
    {
      id: '9',
      name: 'Guantes',
      description: 'Guantes',
      image: 'https://product-images.weber.com/accessory-images/6535.png',
      price: 15,
      category: {
        id: '1',
        name: 'Libros'
      }
    },
    {
      id: '10',
      name: 'Zapatos',
      description: 'Zapatos lorem ipsum dolor lorem ipsum dolor',
      image: 'https://http2.mlstatic.com/customs-ba-zapatos-hombre-botitas-eco-cuero-vestir-keyw-full-D_NQ_NP_853759-MLA31102426796_062019-Q.jpg',
      price: 50,
      category: {
        id: '1',
        name: 'Comida'
      }
    },
    {
      id: '11',
      name: 'Camisa',
      description: 'Camisa lorem ipsum dolor lorem ipsum dolor',
      image: 'http://www.hikoreanfashion.com/76776-thickbox_default/blanca-sin-cuello-dise%C3%B1ador-manga-larga-casual-camisas-de-vestir.jpg',
      price: 35,
      category: {
        id: '1',
        name: 'Comida'
      }
    },
    {
      id: '12',
      name: 'Pantalones',
      description: 'Pantalones lorem ipsum dolor lorem ipsum dolor',
      image: 'https://images-na.ssl-images-amazon.com/images/I/51GOS10o5pL._SX569_.jpg',
      price: 45,
      category: {
        id: '1',
        name: 'Ropa'
      }
    },
    {
      id: '13',
      name: 'Alfombras',
      description: 'Alfombras',
      image: 'https://alfombrasalacarta.com/828-superlarge_default/alfombras-pelo-semi-largo-suave-soft-shaggy.jpg',
      price: 99,
      category: {
        id: '1',
        name: 'Ropa'
      }
    },
    {
      id: '14',
      name: 'Guantes',
      description: 'Guantes',
      image: 'https://product-images.weber.com/accessory-images/6535.png',
      price: 15,
      category: {
        id: '1',
        name: 'Ropa'
      }
    },
    {
      id: '15',
      name: 'Zapatos',
      description: 'Zapatos lorem ipsum dolor lorem ipsum dolor',
      image: 'https://http2.mlstatic.com/customs-ba-zapatos-hombre-botitas-eco-cuero-vestir-keyw-full-D_NQ_NP_853759-MLA31102426796_062019-Q.jpg',
      price: 50,
      category: {
        id: '1',
        name: 'Ropa'
      }
    },
    {
      id: '16',
      name: 'Camisa',
      description: 'Camisa lorem ipsum dolor lorem ipsum dolor',
      image: 'http://www.hikoreanfashion.com/76776-thickbox_default/blanca-sin-cuello-dise%C3%B1ador-manga-larga-casual-camisas-de-vestir.jpg',
      price: 35,
      category: {
        id: '1',
        name: 'Libros'
      }
    },
    {
      id: '17',
      name: 'Pantalones',
      description: 'Pantalones lorem ipsum dolor lorem ipsum dolor',
      image: 'https://images-na.ssl-images-amazon.com/images/I/51GOS10o5pL._SX569_.jpg',
      price: 45,
      category: {
        id: '1',
        name: 'Comida'
      }
    },
    {
      id: '18',
      name: 'Alfombras',
      description: 'Alfombras',
      image: 'https://alfombrasalacarta.com/828-superlarge_default/alfombras-pelo-semi-largo-suave-soft-shaggy.jpg',
      price: 99,
      category: {
        id: '1',
        name: 'Libros'
      }
    },
    {
      id: '19',
      name: 'Guantes',
      description: 'Guantes',
      image: 'https://product-images.weber.com/accessory-images/6535.png',
      price: 15,
      category: {
        id: '1',
        name: 'Ropa'
      }
    }
  ];

  product: Product; 

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    for(var p of this.products) {
      if(params.id == p.id) {
        this.product = p;        
      }
    }
  }

}
