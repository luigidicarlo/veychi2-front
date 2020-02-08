import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-vendor-orders',
  templateUrl: './vendor-orders.component.html',
  styleUrls: ['./vendor-orders.component.css']
})
export class VendorOrdersComponent implements OnInit {

  orders: Order[] = [
    {
      image: 'https://veychi.com/wp-content/plugins/wc-frontend-manager/assets/images/avatar.png',
      order: '#1955',
      article: 'Zapatos',
      buyer: 'Pablo Perez',
      shippingAddress: 'Dirección genérica, Calle 7',
      amount: 18000,
      commission: 0,
      date: ''
    },
    {
      image: 'https://veychi.com/wp-content/plugins/wc-frontend-manager/assets/images/avatar.png',
      order: '#1955',
      article: 'Zapatos',
      buyer: 'Pablo Perez',
      shippingAddress: 'Dirección genérica, Calle 7',
      amount: 18000,
      commission: 0,
      date: ''
    },
    {
      image: 'https://veychi.com/wp-content/plugins/wc-frontend-manager/assets/images/avatar.png',
      order: '#1955',
      article: 'Zapatos',
      buyer: 'Pablo Perez',
      shippingAddress: 'Dirección genérica, Calle 7',
      amount: 18000,
      commission: 0,
      date: ''
    },
    {
      image: 'https://veychi.com/wp-content/plugins/wc-frontend-manager/assets/images/avatar.png',
      order: '#1955',
      article: 'Zapatos',
      buyer: 'Pablo Perez',
      shippingAddress: 'Dirección genérica, Calle 7',
      amount: 18000,
      commission: 0,
      date: ''
    },
    {
      image: 'https://veychi.com/wp-content/plugins/wc-frontend-manager/assets/images/avatar.png',
      order: '#1955',
      article: 'Zapatos',
      buyer: 'Pablo Perez',
      shippingAddress: 'Dirección genérica, Calle 7',
      amount: 18000,
      commission: 0,
      date: ''
    },
    {
      image: 'https://veychi.com/wp-content/plugins/wc-frontend-manager/assets/images/avatar.png',
      order: '#1955',
      article: 'Zapatos',
      buyer: 'Pablo Perez',
      shippingAddress: 'Dirección genérica, Calle 7',
      amount: 18000,
      commission: 0,
      date: ''
    },
    {
      image: 'https://veychi.com/wp-content/plugins/wc-frontend-manager/assets/images/avatar.png',
      order: '#1955',
      article: 'Zapatos',
      buyer: 'Pablo Perez',
      shippingAddress: 'Dirección genérica, Calle 7',
      amount: 18000,
      commission: 0,
      date: ''
    }
    
  ];

  actualPage: number = 1

  constructor() { }

  ngOnInit() {
  }

}
