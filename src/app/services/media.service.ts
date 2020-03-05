import { Injectable } from '@angular/core';
import axios from "axios";
import Response from '../models/resp.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private URI = environment.apiBase;
  private cancelRequest = null;

  constructor() { }

  async uploadImage(data: FormData, token: string): Promise<any> {
    try {
      const aux = await axios({
        method: "post",
        url: `${this.URI}/media`,
        data: {
          images: data.get('images')
        },
        headers: {
          Authorization: token
        },
        cancelToken: new axios.CancelToken(c => {
          this.cancelRequest = c;
        })
      })
      .catch(err => { throw err; });

      const res: Response = aux.data;

      if (!res.ok) { throw res.err; }

      return true;
    } catch(err) {
      throw err;
    }
  }

  // Cancela las peticiones que estén pendientes.
  // @return void
  cancelRequests() {
    this.cancelRequest();
  }
}
