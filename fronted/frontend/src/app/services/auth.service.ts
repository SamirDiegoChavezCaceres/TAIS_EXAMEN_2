import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root', 
})
export class AuthService {
  id: any;
  URL: string;
  isLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private sd: SharedDataService,
  ) {
    this.URL = `${this.sd.root}/login`;
  }

  login(userDetails: { username: string; password: string }): Observable<boolean> {
    // this.id = CryptoJS.SHA256(userDetails.username).toString(CryptoJS.enc.Hex);
    return this.http.post<any>(`${this.URL}`, userDetails)
    // return this.http.get<any>(URL+this.id)
      .pipe(
        map(response => {
          localStorage.setItem('JWT_Token', response.token);
          this.isLoggedIn = true;
          console.log(localStorage.getItem('JWT_Token'), this.isLoggedIn)
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
    return this.isLoggedIn;
  }
}