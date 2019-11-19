import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon.model';

@Component({
  selector: 'app-vendor-coupons',
  templateUrl: './vendor-coupons.component.html',
  styleUrls: ['./vendor-coupons.component.css']
})
export class VendorCouponsComponent implements OnInit {

  coupons: Coupon[] = [
    {
      code: '#1234',
      couponType: 'Porcentaje',
      quantity: 50,
      useLimit: 10,
      dateExpiry: '10/05/2020'
    },
    {
      code: '#2345',
      couponType: 'Porcentaje',
      quantity: 30,
      useLimit: 10,
      dateExpiry: '-'
    },
    {
      code: '#3467',
      couponType: 'Cantidad',
      quantity: 30000,
      useLimit: 0,
      dateExpiry: '25/09/2020'
    },
    {
      code: '#5789',
      couponType: 'Porcentaje',
      quantity: 35,
      useLimit: 1,
      dateExpiry: '-'
    },
    {
      code: '#6457',
      couponType: 'Cantidad',
      quantity: 10000,
      useLimit: 5,
      dateExpiry: '-'
    }
  ];

  actualPage: number = 1;

  constructor() { }

  ngOnInit() {
  }

}
