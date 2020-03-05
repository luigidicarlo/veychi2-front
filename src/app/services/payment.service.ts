import { Injectable } from '@angular/core';
import axios from "axios";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private cancelRequest = null;

  constructor() { }

  async requestPayment(urlRequest: string, inputName: string,  token: string) {
    try {
      const aux = await axios({
        method: "post",
        url: urlRequest,
        data: inputName,
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

      const res = aux;
      console.log(res);

      return res;
    } catch (err) {
      throw err;
    }
  }

  async requestRedirection(urlRequest: string, inputName: string,  token: string) {
    try {
      const aux = await axios({
        method: "post",
        url: urlRequest,
        data: inputName,
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

      const res = aux;
      console.log(res);
      
      return res;
    } catch (err) {
      throw err;
    }
  }
}
