import { Component, OnInit } from '@angular/core';
import Order from 'src/app/models/order.model';
import { OrderService } from '../../../services/order.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-vendor-orders',
  templateUrl: './vendor-orders.component.html',
  styleUrls: ['./vendor-orders.component.css']
})
export class VendorOrdersComponent implements OnInit {

  orders: Order;
  token: string;
  actualPage: number = 1;

  constructor(public orderService: OrderService, public auth: AuthService) { }

  ngOnInit() {
    this.token = this.auth.loadSession();
    this.showOrders(this.token);
  }

  async showOrders(token: string) {
    try {
      this.orders = await this.orderService.getOrders(token).catch(err => {
        throw err;
      });
      console.log(this.orders);
    } catch (err) {
      console.log(err);
    }
  }

}