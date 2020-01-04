import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  URI = 'http://localhost:3535';

  //URI = 'http://veychi-api.herokuapp.com';

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
