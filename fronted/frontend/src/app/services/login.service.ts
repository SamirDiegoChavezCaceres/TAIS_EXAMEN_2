import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URL: string = 'https://lbgs9booc7.execute-api.us-east-1.amazonaws.com/dev/products';
  constructor(private httpClient: HttpClient) { }
    
  loginAdmin(v: any){
    return this.http.post<Usuario>(${this.urlApi}/login, v)
  }

  insertAdmin(v: any){
    return this.http.post(${this.urlApi}, v)
  }

  getUsers(){
    return this.http.get<Usuario[]>(${this.urlApi})
  }

  getUser(id: string){
    return this.http.get<Usuario>(${this.urlApi}/${id})
  }
}
