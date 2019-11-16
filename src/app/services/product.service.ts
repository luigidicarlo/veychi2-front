import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getProducts() {
    
  }
}
