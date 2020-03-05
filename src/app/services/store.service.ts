import { Injectable } from '@angular/core';
import axios from "axios";
import Store from '../models/store.model';
import Response from '../models/resp.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  URI = environment.apiBase;

  isVendor = false;

  public store: Store;

  private cancelRequest = null;

  constructor() { }

  async getLoggedVendor(token: string) {
    try {
      const aux = await axios({
        method: "get",
        url: `${this.URI}/stores`,
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

      this.store = res.data as Store;
      return this.store;
    } catch (err) {
      throw err;
    }
  }

  async vendorRequest(store: Store, token: string) {
    try {
      const aux = await axios({
        method: "post",
        url: `${this.URI}/stores`,
        data: store,
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
}
