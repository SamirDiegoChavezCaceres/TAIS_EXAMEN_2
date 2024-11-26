import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductInterface } from '../interfaces/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_URL: string = 'https://lbgs9booc7.execute-api.us-east-1.amazonaws.com/dev/products';
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<any> {
    return this.httpClient.get(this.API_URL).pipe(res => res);
  }

  // Agregar producto
  addProduct(product: ProductInterface): Observable<ProductInterface> {
    return this.httpClient.post<ProductInterface>(this.API_URL, product);
  }
}
