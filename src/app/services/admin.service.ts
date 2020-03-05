import { Injectable } from '@angular/core';
import axios from "axios";
import Store from '../models/store.model';
import Order from '../models/order.model';
import User from '../models/user.model';
import Response from '../models/resp.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public order;
  public user;
  public store;
  URI = environment.apiBase;
  private cancelRequest = null;

  constructor() { }

  async getVendorRequests(token: string) {
    try {
      const aux = await axios({
        method: "get",
        url: `${this.URI}/admin/stores`,
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
      
      const res: Response = aux.data;

      if (!res.ok) {
        throw res.err;
      }

      this.store = res.data;
      return this.store as Store;
    } catch (err) {
      throw err;
    }
  }

  async getOrders(token: string) {
    try {
      const aux = await axios({
        method: "get",
        url: `${this.URI}/admin/orders`,
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
      
      const res: Response = aux.data;

      if (!res.ok) {
        throw res.err;
      }

      this.order = res.data;
      return this.order as Order;
    } catch (err) {
      throw err;
    }
  }

  async updateVendor(id: string, token: string) {
    try {
      const aux = await axios({
        method: "put",
        url: `${this.URI}/admin/stores/${id}`,
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

      const res: Response = aux.data;

      if (!res.ok) {
        throw res.err;
      }

      return res.data as Store;
    } catch (err) {
      throw err;
    }
  }

  async getUsers(token: string) {
    try {
      const aux = await axios({
        method: "get",
        url: `${this.URI}/admin/users`,
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
      
      const res: Response = aux.data;

      if (!res.ok) {
        throw res.err;
      }

      this.user = res.data;
      return this.user as User;
    } catch (err) {
      throw err;
    }
  }

  async updateUser(id: string, user: User, token: string) {
    try {
      const aux = await axios({
        method: "put",        
        url: `${this.URI}/admin/users/${id}`,
        data: user,
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

      const res: Response = aux.data;

      if (!res.ok) {
        throw res.err;
      }

      return res.data as User;
    } catch (err) {
      throw err;
    }
  }

  async deleteUser(id: string, token: string) {
    try {
      const aux = await axios({
        method: "delete",
        url: `${this.URI}/admin/users/${id}`,
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

      const res: Response = aux.data;

      if (!res.ok) {
        throw res.err;
      }

      return res.data as User;
    } catch (err) {
      throw err;
    }
  }

}
