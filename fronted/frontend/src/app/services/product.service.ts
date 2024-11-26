import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInterface } from '../interfaces/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //API_URL: string = 'https://dummyjson.com/products/';
  GET_ID = "0f7ttojh76"
  POST_ID = "ou4attuxfl"
  GET_URL: string = 'https://'+this.GET_ID+'.execute-api.us-east-1.amazonaws.com/dev/products';
  POST_URL: string = 'https://'+this.POST_ID+'.execute-api.us-east-1.amazonaws.com/dev/products';
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<any> {
    return this.httpClient.get(this.GET_URL).pipe(res => res);
  }

  // Agregar producto
  addProduct(product: ProductInterface): Observable<ProductInterface> {
    return this.httpClient.post<ProductInterface>(this.POST_URL, product);
  }
}