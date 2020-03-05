import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import axios from "axios";
import User from '../models/user.model';
import Response from '../models/resp.model';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URI = environment.apiBase;

  isVendor = false;

  public user: User;

  private cancelRequest = null;

  constructor(private http: HttpClient) { }

  // Regresa la información del usuario que esté
  // asociado al token almacenado en localStorage
  // y lo guarda en this.user.
  // @param token: string
  // @return void
  async getLoggedinUser(token: string) {
    try {
      const aux = await axios({
        method: "get",
        url: `${this.URI}/users`,
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

      this.user = res.data as User;
      return this.user;
    } catch (err) {
      throw err;
    }
  }

  async updatePassword(password: string, token: string): Promise<User> {
    try {
      const aux = await axios({
        method: "put",
        url: `${this.URI}/users/password`,
        data: { password },
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

      if (!res.ok) { throw res.err; }

      return res.data as User;
    } catch (err) {
      throw err;
    }
  }

  async createUser(user: User) {
    try {
      const aux = await axios({
        method: "post",
        url: `${this.URI}/users`,
        data: user,
        headers: {
          "Content-Type": "application/json"
        },
        cancelToken: new axios.CancelToken(c => {
          this.cancelRequest = c;
        })
      }).catch(err => {
        throw err;
      });

      const res: Response = aux.data;

      if (!res.ok) {
        console.log(res);
        throw res;
      }

      return res.data as User;
    } catch (err) {
      throw err;
    }
  }

  async forgotPassword(user: {username: string}) {
    try {
      const aux = await axios({
        method: "post",
        url: `${this.URI}/password/token`,
        data: user,
        headers: {
          "Content-Type": "application/json"
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

      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async recoverPassword(user: {password: string, token: string}) {
    try {
      const aux = await axios({
        method: "post",
        url: `${this.URI}/password/recovery-change`,
        data: user,
        headers: {
          "Content-Type": "application/json"
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