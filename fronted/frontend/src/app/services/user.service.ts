import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  GET_ID = "k4qq9gg0wj"
  POST_ID = "yv0yq03x6d"
  GET_URL: string = 'https://'+this.GET_ID+'.execute-api.us-east-1.amazonaws.com/dev/users';
  POST_URL: string = 'https://'+this.POST_ID+'.execute-api.us-east-1.amazonaws.com/dev/users';
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<any> {
    return this.httpClient.get(this.GET_URL).pipe(res => res);
  }
  
  addUser(user: UserInterface): Observable<UserInterface> {
    return this.httpClient.post<UserInterface>(this.POST_URL, user);
  }
}

