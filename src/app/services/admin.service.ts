import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  URI = environment.apiBase;

  constructor(private http: HttpClient) { }

  getVendorRequests(token: any) {
    return this.http.get(`${this.URI}/admin/stores`, { headers: new HttpHeaders({ Authorization: token }) });
  }

  updateVendor(id: string, token: any) {
    return this.http.put(`${this.URI}/admin/stores/${id}`, {}, { headers: new HttpHeaders({ Authorization: token }) });
  }
}
