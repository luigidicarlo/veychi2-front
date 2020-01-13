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

  getVendorRequests(token: any): Observable<Response> {
    return this.http.get<Response>(`${this.URI}/admin/stores`, { headers: new HttpHeaders({ Authorization: token }) });
  }

  updateVendor(id: string, token: any): Observable<Response> {
    return this.http.put<Response>(`${this.URI}/admin/stores/${id}`, {}, { headers: new HttpHeaders({ Authorization: token }) });
  }

  getUsers(token: any): Observable<Response> {
  	return this.http.get<Response>(`${this.URI}/admin/users`, { headers: new HttpHeaders({ Authorization: token }) });	
  }

  deleteUser(id: string, token): Observable<Response> {
    return this.http.delete<Response>(`${this.URI}/admin/users/${id}`, { headers: new HttpHeaders({ Authorization: token }) });
  }
}
