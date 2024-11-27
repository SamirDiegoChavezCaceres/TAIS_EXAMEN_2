import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInterface } from '../interfaces/product.interface';
import { SharedDataService } from './shared-data.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //API_URL: string = 'https://dummyjson.com/products/';
  GET_URL: any
  POST_URL: any
  constructor(
    private httpClient: HttpClient,
    private sd: SharedDataService,
  ) {
    this.GET_URL = `${this.sd.root}/products`;
    this.POST_URL = `${this.sd.root}/products-create`;
  }

  getProducts(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("JWT_Token")}`, // Reemplaza con tu token
    });
    return this.httpClient.get(this.GET_URL, { headers }).pipe(res => res);
  }

  // Agregar producto
  addProduct(product: ProductInterface): Observable<ProductInterface> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("JWT_Token")}`, // Reemplaza con tu token
    });
    return this.httpClient.post<ProductInterface>(this.POST_URL, product, {headers});
  }
}