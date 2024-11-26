import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInterface } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL: string = 'https://k4qq9gg0wj.execute-api.us-east-1.amazonaws.com/dev/users';
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<any> {
    return this.httpClient.get(this.API_URL).pipe(res => res);
  }
}

