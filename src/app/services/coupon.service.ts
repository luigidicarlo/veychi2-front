import { Injectable } from '@angular/core';
import axios from "axios";
import Coupon from '../models/coupon.model';
import Response from '../models/resp.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  public coupon;
  private URI = environment.apiBase;
  private cancelRequest = null;  

  constructor() { }

  // Método para obtener todos los cupones
  async getCoupons(token: string) {
    try {
      const aux = await axios({
        method: "get",
        url: `${this.URI}/coupons`,
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

      this.coupon = res.data as Coupon;
      return this.coupon;
    } catch (err) {
      throw err;
    }
  }

  // Método para obtener un cupón a través de su ID
  async getCoupon(name: string, token: string) {
    try {
      const aux = await axios({
        method: "get",
        url: `${this.URI}/coupons/${name}`,
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

      this.coupon = res.data as Coupon;
      return this.coupon;
    } catch (err) {
      throw err;
    }
  }

  // Método para crear un cupón
  async createCoupon(coupon: Coupon, token: string) {
    try {
      const aux = await axios({
        method: "post",
        url: `${this.URI}/coupons`,
        data: coupon,
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

      return res.data as Coupon;
    } catch (err) {
      throw err;
    }
  }

  // Método para actualizar un cupón a través de su ID
  async updateCoupon(id: string, coupon: Coupon, token: string) {
    try {
      const aux = await axios({
        method: "put",
        url: `${this.URI}/coupons/${id}`,
        data: coupon,
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

      return res.data as Coupon;
    } catch (err) {
      throw err;
    }
  }

  // Método para eliminar un cupón a través de su ID
  async deleteCoupon(id: string, token: string) {
    try {
      const aux = await axios({
        method: "delete",
        url: `${this.URI}/coupons/${id}`,
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

      return res.data as Coupon;
    } catch (err) {
      throw err;
    }
  }

}
