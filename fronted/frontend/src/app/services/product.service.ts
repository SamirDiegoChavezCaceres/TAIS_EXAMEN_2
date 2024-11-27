import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInterface } from '../interfaces/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //API_URL: string = 'https://dummyjson.com/products/';
  GET_ID = "7wygl76pj7"
  POST_ID = "7wygl76pj7"
  GET_URL: string = 'https://'+this.GET_ID+'.execute-api.us-east-1.amazonaws.com/dev/products';
  POST_URL: string = 'https://'+this.POST_ID+'.execute-api.us-east-1.amazonaws.com/dev/products-create';
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczMjY3NzMxNSwianRpIjoiNjJkZjA1NDAtYTNkYi00ZWIxLWFlZjUtYWM3NDczNTk0NDIwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImZkZWxnYWRvdiIsIm5iZiI6MTczMjY3NzMxNSwiY3NyZiI6ImE3NzVjNGU2LTU4YWYtNDhhNS05ZjM0LWI0MWU4NGYwMjIwYiIsImV4cCI6MTczMjY3ODIxNX0.5QkJj0TtbuQLiYLynEdvau46bBChVgn6wpmfLjZGeOE"
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`, // Reemplaza con tu token
    });
    return this.httpClient.get(this.GET_URL, { headers }).pipe(res => res);
  }

  // Agregar producto
  addProduct(product: ProductInterface): Observable<ProductInterface> {
    return this.httpClient.post<ProductInterface>(this.POST_URL, product);
  }
}