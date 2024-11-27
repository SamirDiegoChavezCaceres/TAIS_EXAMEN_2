import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root', 
})
export class AuthService {
  id: any;
  constructor(private http: HttpClient) {}
  URL = 'https://k4qq9gg0wj.execute-api.us-east-1.amazonaws.com/dev/users/';
  isLoggedIn: boolean = false;

  login(userDetails: { username: string; password: string }): Observable<boolean> {
    // this.id = CryptoJS.SHA256(userDetails.username).toString(CryptoJS.enc.Hex);
    return this.http.post<any>('http://examples/api/login', userDetails)
    // return this.http.get<any>(URL+this.id)
      .pipe(
        map(response => {
          localStorage.setItem('JWT_Token', response.token);
          this.isLoggedIn = true;
          return true;
        }),
        catchError(error => {
          console.log(error);
          this.isLoggedIn = false;
          return of(false);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('JWT_Token');
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    this.isLoggedIn = true
    return this.isLoggedIn;
  }
}