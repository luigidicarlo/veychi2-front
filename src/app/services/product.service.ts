import { Injectable } from '@angular/core';
import axios from "axios";
import Product from '../models/product.model';
import Response from '../models/resp.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  public products: Product|Product[];
  private URI = environment.apiBase;
  private cancelRequest = null;

  constructor() { }

  async getProducts() {
    try {
      const aux = await axios({
        method: "get",
        url: `${this.URI}/products`,
        headers: {
          "Content-Type": "application/json",
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

      this.products = res.data as Product|Product[];
      return this.products;
    } catch (err) {
      throw err;
    }
  }

  async getProduct(id: string) {
    let product: Product;

    try {
      const aux = await axios({
        method: "get",
        url: `${this.URI}/products/${id}`,
        headers: {
          "Content-Type": "application/json",
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

      product = res.data as Product;
      return product;
    } catch (err) {
      throw err;
    }
  }

  async createProduct(product: Product, token: string) {
    try {
      const aux = await axios({
        method: "post",
        url: `${this.URI}/products`,
        data: product,
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

      return res.data as Product;
    } catch (err) {
      throw err;
    }
  }

  async updateProduct(id: string, product: Product, token: any) {
    try {
      const aux = await axios({
        method: "put",
        url: `${this.URI}/products/${id}`,
        data: product,
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

      return res.data as Product;
    } catch (err) {
      throw err;
    }
  }

  async deleteProduct(id: string, token: string) {
    try {
      const aux = await axios({
        method: "delete",
        url: `${this.URI}/products/${id}`,
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

      return res.data as Product;
    } catch (err) {
      throw err;
    }
  }
}