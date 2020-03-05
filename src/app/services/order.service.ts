import { Injectable } from '@angular/core';
import axios from "axios";
import Order from '../models/order.model'
import Response from '../models/resp.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public order;
  private URI = environment.apiBase;
  private cancelRequest = null;

  constructor() { }

  async getOrders(token: string) {
    try {
      const aux = await axios({
        method: "get",
        url: `${this.URI}/orders`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        cancelToken: new axios.CancelToken(c => {
          this.cancelRequest = c;
        })
      }).catch(err => {
        throw err;
      });
      
      const res = aux.data;


      if (!res.ok) {
      	console.log(res);
        throw res.error;
      }

      this.order = res.data;
      return this.order as Order;
    } catch (err) {
      throw err;
    }
  }

  async createOrder(order: Order, token: string) {
    try {
      const aux = await axios({
        method: "post",
        url: `${this.URI}/orders`,
        data: order,
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        cancelToken: new axios.CancelToken(c => {
          this.cancelRequest = c;
        })
      }).catch(err => {
        throw err;
      });

      const res = aux.data;

      if (!res.ok) {
        console.log(res)
        throw res.err;
      }

      return res.data as Order;
    } catch (err) {
      throw err;
    }
  }

}
