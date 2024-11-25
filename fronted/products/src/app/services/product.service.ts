import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API_URL: string = 'https://k9dxp7tom8.execute-api.us-east-1.amazonaws.com/dev/products';
  constructor(private httpClient: HttpClient) { }
    
  getProducts(): Observable<any> {
    return this.httpClient.get(this.API_URL).pipe(res => res);
  }
}
