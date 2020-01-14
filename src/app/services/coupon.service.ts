import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  URI = environment.apiBase;

  constructor(private http: HttpClient) { }

  getCoupons(token): Observable<Response> {
  	return this.http.get<Response>(`${this.URI}/coupons`, { headers: new HttpHeaders({ Authorization: token }) });
  }

  getCoupon(name: string, token): Observable<Response> {
    return this.http.get<Response>(`${this.URI}/coupons/${name}`, { headers: new HttpHeaders({ Authorization: token }) });
  }

  createCoupon(coupon: {name: string, expiration: string, value: number, percentage: boolean}, token): Observable<Response> {
      return this.http.post<Response>(`${this.URI}/coupons`, coupon, { headers: new HttpHeaders({ Authorization: token }) });
  }

  updateCoupon(id: string, coupon: {name: string, expiration: string, value: number, percentage: boolean}, token): Observable<Response> {
    return this.http.put<Response>(`${this.URI}/coupons/${id}`, coupon, { headers: new HttpHeaders({ Authorization: token }) });
  }

  deleteCoupon(id: string, token): Observable<Response> {
    return this.http.delete<Response>(`${this.URI}/coupons/${id}`, { headers: new HttpHeaders({ Authorization: token }) });
  }

}
