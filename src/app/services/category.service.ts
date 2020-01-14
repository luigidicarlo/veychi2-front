import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  URI = environment.apiBase;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Response> {
    return this.http.get<Response>(`${this.URI}/categories`);
  }

  getCategory(id: string): Observable<Response> {
    return this.http.get<Response>(`${this.URI}/categories/${id}`);
  }

  getCategoryProduct(id: string): Observable<Response> {
    return this.http.get<Response>(`${this.URI}/categories/${id}/products`);
  }

  createCategory(category: { name: string, parent: string, imageUrl: string }, token: any): Observable<Response> {
    return this.http.post<Response>(`${this.URI}/categories`, category, { headers: new HttpHeaders({ Authorization: token }) });
  }

  updateCategory(id: string, category: { name: string, parent: string, imageUrl: string }, token: any): Observable<Response> {
    return this.http.put<Response>(`${this.URI}/categories/${id}`, category, { headers: new HttpHeaders({ Authorization: token }) });
  }

  deleteCategory(id: string, token): Observable<Response> {
    return this.http.delete<Response>(`${this.URI}/categories/${id}`, { headers: new HttpHeaders({ Authorization: token }) });
  }

}
