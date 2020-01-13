import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Response } from '../models/response.model';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URI = environment.apiBase;

  isVendor = false;

  constructor(private http: HttpClient) { }

  createUser(user: {username: string, fname: string, lname: string, email: string, password: string}): Observable<Response> {
    return this.http.post<Response>(`${this.URI}/users`, user);
  }

  vendorRequest(user: {name: string, description: string, rut: string, activity: string}, token: any): Observable<Response> {
    return this.http.post<Response>(`${this.URI}/stores`, user, { headers: new HttpHeaders({ Authorization: token }) });
  }

  getLoggedVendor(token: any): Observable<Response> {
   return this.http.get<Response>(
      this.URI + '/stores',
      { headers: new HttpHeaders({ Authorization: token }) }
    );
  }

  forgotPassword(user: {username: string}): Observable<Response> {
    return this.http.post<Response>(`${this.URI}/password/token`, user);
  }

  recoverPassword(user: {password: string, token: any}): Observable<Response> {
    return this.http.post<Response>(`${this.URI}/password/recovery-change`, user);
  }

}
