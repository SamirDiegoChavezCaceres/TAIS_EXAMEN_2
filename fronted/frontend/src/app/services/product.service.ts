import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API_URL: string = 'https://4zq3z6gzy6.execute-api.us-east-1.amazonaws.com/dev/products';
  constructor(private httpClient: HttpClient) { }
    
  getProducts(): Observable<any> {
    return this.httpClient.get(this.API_URL).pipe(res => res);
  }
}
