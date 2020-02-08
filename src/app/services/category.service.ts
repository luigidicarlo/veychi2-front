import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from "axios";
import Category from '../models/category.model';
import { Response } from '../models/response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  public category;
  private URI = environment.apiBase;
  private cancelRequest = null;

  //URI = 'http://veychi-api.herokuapp.com';

  constructor(private http: HttpClient) { }

  async getCategories() {
    try {
      const aux = await axios({
        method: "get",
        url: `${this.URI}/categories`,
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

      this.category = res.data;
      return this.category;
    } catch (err) {
      throw err;
    }
  }

  async getCategory(id: string) {
    try {
      const aux = await axios({
        method: "get",
        url: `${this.URI}/categories/${id}`,
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

      this.category = res.data;
      return this.category;
    } catch (err) {
      throw err;
    }
  }

  async getCategoryProduct(id: string) {
    try {
      const aux = await axios({
        method: "get",
        url: `${this.URI}/categories/${id}/products`,
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

      this.category = res.data;
      return this.category;
    } catch (err) {
      throw err;
    }
  }

  async createCategory(category: Category, token: string) {
    try {
      const aux = await axios({
        method: "post",
        url: `${this.URI}/categories`,
        data: category,
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

      return res.data as Category;
    } catch (err) {
      throw err;
    }
  }

  async updateCategory(id: string, category: Category, token: any) {
    try {
      const aux = await axios({
        method: "put",
        url: `${this.URI}/categories/${id}`,
        data: category,
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

      return res.data as Category;
    } catch (err) {
      throw err;
    }
  }

  async deleteCategory(id: string, token: string) {
    try {
      const aux = await axios({
        method: "delete",
        url: `${this.URI}/categories/${id}`,
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

      return res.data as Category;
    } catch (err) {
      throw err;
    }
  }

}
