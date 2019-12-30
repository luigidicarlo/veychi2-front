import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  URI = environment.apiBase;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Response> {
  	return this.http.get<Response>(`${this.URI}/products`);
  }

  getProduct(id: string): Observable<Response> {
    return this.http.get<Response>(`${this.URI}/products/${id}`);
  }

  createProduct(product: {name: string, price: number, discount: number, description: string,
    shortDescription: string, images: string[], tags: string[], category: string}, token): Observable<Response> {
      return this.http.post<Response>(`${this.URI}/products`, product, { headers: new HttpHeaders({ Authorization: token }) });
  }

  updateProduct(id: string, product: { name: string, price: number, discount: number, description: string, shortDescription: string, images: string[], tags: string[], category: string }, token: any): Observable<Response> {
    return this.http.put<Response>(`${this.URI}/products/${id}`, product, { headers: new HttpHeaders({ Authorization: token }) });
  }

  deleteProduct(id: string, token): Observable<Response> {
    return this.http.delete<Response>(`${this.URI}/products/${id}`, { headers: new HttpHeaders({ Authorization: token }) });
  }
}
