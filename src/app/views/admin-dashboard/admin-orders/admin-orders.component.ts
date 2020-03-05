import { Component, OnInit } from '@angular/core';
import Order from 'src/app/models/order.model';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders: Order;
  token: string;
  actualPage: number = 1;

  constructor(public adminService: AdminService, public auth: AuthService) { }

  ngOnInit() {
  	this.token = this.auth.loadSession();
  	this.showOrders(this.token);
  }

  async showOrders(token: string) {
  	try {
      this.orders = await this.adminService.getOrders(token).catch(err => {
        throw err;
      });
      console.log(this.orders);
    } catch (err) {
      console.log(err);
    }
  }

}
