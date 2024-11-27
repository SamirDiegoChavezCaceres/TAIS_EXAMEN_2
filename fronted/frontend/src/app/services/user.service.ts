import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  GET_URL: any
  POST_URL: any
  constructor(
    private httpClient: HttpClient,
    private sd: SharedDataService,
  ) {
    this.GET_URL = `${this.sd.root}/users`
    this.POST_URL = `${this.sd.root}/users-create`
  }

  getUsers(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("JWT_Token")}`, // Reemplaza con tu token
    });
    return this.httpClient.get(this.GET_URL, {headers}).pipe(res => res);
  }
  
  addUser(user: UserInterface): Observable<UserInterface> {
    return this.httpClient.post<UserInterface>(this.POST_URL, user);
  }
}

